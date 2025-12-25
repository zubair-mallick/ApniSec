// Mock Prisma Client for testing
export const createMockPrisma = () => {
  const mockUser = {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
    password: '$2b$10$hashedpassword',
    createdAt: new Date(),
  }

  const mockIssue = {
    id: 'issue-123',
    userId: 'user-123',
    type: 'Cloud Security',
    title: 'Test Issue',
    description: 'Test Description',
    priority: 'medium',
    status: 'open',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: 'user-123',
      name: 'Test User',
      email: 'test@example.com',
    },
  }

  return {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    issue: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    $disconnect: jest.fn(),
    mockUser,
    mockIssue,
  }
}

