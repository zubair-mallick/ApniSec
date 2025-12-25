import { JwtUtil } from '@/backend/utils/JwtUtil'
import { EmailUtil } from '@/backend/utils/EmailUtil'

// Mock Resend
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({ id: 'email-123' }),
      },
    })),
  }
})

describe('Utility Tests', () => {
  describe('JWT Utility', () => {
    test('1. JWT sign & verify works - should sign and verify tokens correctly', () => {
      const payload = { id: 'user-123', email: 'test@example.com' }

      // Sign token
      const token = JwtUtil.sign(payload)

      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)

      // Verify token
      const decoded = JwtUtil.verify(token)

      expect(decoded).toHaveProperty('id')
      expect(decoded).toHaveProperty('email')
      expect(decoded.id).toBe('user-123')
      expect(decoded.email).toBe('test@example.com')
      expect(decoded).toHaveProperty('iat')
      expect(decoded).toHaveProperty('exp')
    })

    test('JWT verify invalid token - should throw error', () => {
      const invalidToken = 'invalid.token.here'

      expect(() => {
        JwtUtil.verify(invalidToken)
      }).toThrow('Invalid or expired token')
    })
  })

  describe('Email Utility', () => {
    test('2. EmailUtil mocked success - should send email without errors', async () => {
      const to = 'test@example.com'
      const name = 'Test User'

      // Mock Resend
      const mockSend = jest.fn().mockResolvedValue({ id: 'email-123' })
      jest.doMock('resend', () => {
        return {
          Resend: jest.fn().mockImplementation(() => ({
            emails: {
              send: mockSend,
            },
          })),
        }
      })

      // Should not throw
      await expect(EmailUtil.sendWelcomeEmail(to, name)).resolves.not.toThrow()
    })
  })
})

