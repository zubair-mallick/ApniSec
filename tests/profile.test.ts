import { GET as getProfileHandler, PUT as updateProfileHandler } from '@/app/api/users/profile/route'
import { createMockRequest, getResponseData, createAuthToken } from './helpers/testUtils'
import bcrypt from 'bcrypt'

// Mock Prisma - create instance inside factory
jest.mock('@prisma/client', () => {
  const { createMockPrisma } = require('./helpers/mockPrisma')
  return {
    PrismaClient: jest.fn(() => createMockPrisma()),
  }
})

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}))

describe('Profile Tests', () => {
  let authToken: string
  let mockPrisma: any

  beforeEach(() => {
    jest.clearAllMocks()
    authToken = createAuthToken('user-123', 'test@example.com')
    const { PrismaClient } = require('@prisma/client')
    mockPrisma = new PrismaClient()
    // Reset mock implementations
    mockPrisma.user.findUnique.mockClear()
    mockPrisma.user.update.mockClear()
  })

  test('1. get profile success - should return user profile', async () => {
    const user = {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      password: '$2b$10$hashedpassword',
      createdAt: new Date('2024-01-01'),
    }

    // UserRepository uses findUserById which calls findById
    mockPrisma.user.findUnique.mockImplementation((args: any) => {
      if (args.where.id === 'user-123') {
        return Promise.resolve(user)
      }
      return Promise.resolve(null)
    })

    const req = createMockRequest('GET', undefined, {
      authorization: `Bearer ${authToken}`,
    })

    const response = await getProfileHandler(req)
    const data = await getResponseData(response)

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toHaveProperty('id')
    expect(data.data).toHaveProperty('name')
    expect(data.data).toHaveProperty('email')
    expect(data.data.name).toBe('John Doe')
    expect(data.data.email).toBe('john@example.com')
    expect(data.data).not.toHaveProperty('password')
  })

  test('2. update profile name - should update name successfully', async () => {
    const existingUser = {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      password: '$2b$10$hashedpassword',
      createdAt: new Date(),
    }

    const updatedUser = {
      ...existingUser,
      name: 'Jane Doe',
    }

    mockPrisma.user.findUnique.mockImplementation((args: any) => {
      if (args.where.id === 'user-123') {
        return Promise.resolve(existingUser)
      }
      return Promise.resolve(null)
    })
    mockPrisma.user.update.mockResolvedValue(updatedUser)

    const req = createMockRequest(
      'PUT',
      {
        name: 'Jane Doe',
      },
      {
        authorization: `Bearer ${authToken}`,
      }
    )

    const response = await updateProfileHandler(req)
    const data = await getResponseData(response)

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.name).toBe('Jane Doe')
    expect(mockPrisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'user-123' },
        data: expect.objectContaining({ name: 'Jane Doe' }),
      })
    )
  })

  test('3. update email format check - should validate email format', async () => {
    const req = createMockRequest(
      'PUT',
      {
        email: 'invalid-email-format',
      },
      {
        authorization: `Bearer ${authToken}`,
      }
    )

    const response = await updateProfileHandler(req)
    const data = await getResponseData(response)

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toContain('Invalid email format')
  })

  test('4. missing profile fields rejects - should validate minimum name length', async () => {
    const req = createMockRequest(
      'PUT',
      {
        name: 'A', // Too short
      },
      {
        authorization: `Bearer ${authToken}`,
      }
    )

    const response = await updateProfileHandler(req)
    const data = await getResponseData(response)

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toContain('at least 2 characters')
  })

  test('5. unauthorized profile access - should reject without token', async () => {
    const req = createMockRequest('GET')

    const response = await getProfileHandler(req)
    const data = await getResponseData(response)

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
    expect(data.error).toContain('Unauthorized')
  })
})
