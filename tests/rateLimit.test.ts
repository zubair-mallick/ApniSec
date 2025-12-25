import { RateLimiter } from '@/backend/utils/RateLimiter'
import { POST as registerHandler } from '@/app/api/auth/register/route'
import { createMockRequest, getResponseData } from './helpers/testUtils'
import { createMockPrisma } from './helpers/mockPrisma'
import bcrypt from 'bcrypt'

// Mock Prisma
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => createMockPrisma()),
}))

// Mock EmailUtil
jest.mock('@/backend/utils/EmailUtil', () => ({
  EmailUtil: {
    sendWelcomeEmail: jest.fn().mockResolvedValue(undefined),
  },
}))

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}))

describe('Rate Limit Tests', () => {
  let mockPrisma: ReturnType<typeof createMockPrisma>

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    mockPrisma = createMockPrisma()
    // @ts-ignore
    const { PrismaClient } = require('@prisma/client')
    PrismaClient.mockImplementation(() => mockPrisma)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('1. allow first 100 requests - should process requests within limit', async () => {
    const rateLimiter = new RateLimiter(100, 900000) // 100 requests per 15 minutes
    const clientIp = '192.168.1.1'

    // Make 100 requests
    for (let i = 0; i < 100; i++) {
      await expect(rateLimiter.checkLimit(clientIp)).resolves.not.toThrow()
    }

    // Verify remaining requests
    const remaining = rateLimiter.getRemainingRequests(clientIp)
    expect(remaining).toBe(0)
  })

  test('2. 101st request returns 429 - should reject after limit exceeded', async () => {
    const rateLimiter = new RateLimiter(100, 900000)
    const clientIp = '192.168.1.1'

    // Make 100 requests
    for (let i = 0; i < 100; i++) {
      await rateLimiter.checkLimit(clientIp)
    }

    // 101st request should fail
    await expect(rateLimiter.checkLimit(clientIp)).rejects.toThrow('Rate limit exceeded')
  })

  test('3. reset after time period - should allow requests after window expires', async () => {
    const rateLimiter = new RateLimiter(2, 1000) // 2 requests per 1 second
    const clientIp = '192.168.1.1'

    // Make 2 requests
    await rateLimiter.checkLimit(clientIp)
    await rateLimiter.checkLimit(clientIp)

    // 3rd request should fail
    await expect(rateLimiter.checkLimit(clientIp)).rejects.toThrow()

    // Fast-forward time by 1 second
    jest.advanceTimersByTime(1000)

    // Now requests should be allowed again
    await expect(rateLimiter.checkLimit(clientIp)).resolves.not.toThrow()
  })
})

