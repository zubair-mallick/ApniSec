// Test setup file
import '@testing-library/jest-dom'

// Mock environment variables
process.env.JWT_SECRET = 'test-secret-key-for-jest-tests'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'
process.env.RESEND_API_KEY = 'test-resend-api-key'

// Suppress console errors in tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
}

