import { POST as createIssueHandler, GET as getIssuesHandler } from '@/app/api/issues/route'
import { GET as getIssueHandler, PUT as updateIssueHandler, DELETE as deleteIssueHandler } from '@/app/api/issues/[id]/route'
import { createMockRequest, getResponseData, createAuthToken } from './helpers/testUtils'

// Mock IssueRepository methods - defined inside mock factory
const mockIssueRepoMethods = {
  createIssue: jest.fn(),
  findIssueById: jest.fn(),
  findIssuesByUserId: jest.fn(),
  updateIssue: jest.fn(),
  deleteIssue: jest.fn(),
  searchIssues: jest.fn(),
}

// Mock IssueRepository
jest.mock('@/backend/repositories/IssueRepository', () => {
  return {
    IssueRepository: jest.fn().mockImplementation(() => mockIssueRepoMethods),
  }
})

// Mock Prisma Client - create instance inside factory
jest.mock('@prisma/client', () => {
  const { createMockPrisma } = require('./helpers/mockPrisma')
  return {
    PrismaClient: jest.fn(() => createMockPrisma()),
  }
})

describe('Issue Tests', () => {
  let authToken: string

  beforeEach(() => {
    jest.clearAllMocks()
    authToken = createAuthToken('user-123', 'test@example.com')
    // Reset issue repo mocks
    Object.values(mockIssueRepoMethods).forEach(mock => mock.mockClear())
  })

  describe('Create Issue', () => {
    test('1. create issue successfully - should return created issue', async () => {
      const newIssue = {
        type: 'Cloud Security',
        title: 'Security Vulnerability Found',
        description: 'A critical security vulnerability has been discovered',
        priority: 'high',
      }

      const createdIssue = {
        id: 'issue-123',
        userId: 'user-123',
        ...newIssue,
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockIssueRepoMethods.createIssue.mockResolvedValue(createdIssue)

      const req = createMockRequest('POST', newIssue, {
        authorization: `Bearer ${authToken}`,
      })

      const response = await createIssueHandler(req)
      const data = await getResponseData(response)

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data.type).toBe('Cloud Security')
      expect(data.data.title).toBe('Security Vulnerability Found')
      expect(mockIssueRepoMethods.createIssue).toHaveBeenCalled()
    })

    test('2. missing title - should reject creation', async () => {
      const req = createMockRequest(
        'POST',
        {
          type: 'Cloud Security',
          description: 'Some description',
        },
        {
          authorization: `Bearer ${authToken}`,
        }
      )

      const response = await createIssueHandler(req)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Title')
    })

    test('3. invalid issue type - should reject creation', async () => {
      const req = createMockRequest(
        'POST',
        {
          type: 'Invalid Type',
          title: 'Test Issue',
          description: 'Test description here',
        },
        {
          authorization: `Bearer ${authToken}`,
        }
      )

      const response = await createIssueHandler(req)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Invalid issue type')
    })
  })

  describe('List Issues', () => {
    test('4. list issues returns user issues only - should filter by userId', async () => {
      const userIssues = [
        {
          id: 'issue-1',
          userId: 'user-123',
          type: 'Cloud Security',
          title: 'Issue 1',
          description: 'Description 1',
          priority: 'high',
          status: 'open',
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {
            id: 'user-123',
            name: 'Test User',
            email: 'test@example.com',
          },
        },
        {
          id: 'issue-2',
          userId: 'user-123',
          type: 'VAPT',
          title: 'Issue 2',
          description: 'Description 2',
          priority: 'medium',
          status: 'in-progress',
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {
            id: 'user-123',
            name: 'Test User',
            email: 'test@example.com',
          },
        },
      ]

      mockIssueRepoMethods.findIssuesByUserId.mockResolvedValue(userIssues)

      const req = createMockRequest('GET', undefined, {
        authorization: `Bearer ${authToken}`,
      })

      const response = await getIssuesHandler(req)
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(2)
      expect(data.data[0].userId).toBe('user-123')
    })

    test('5. get single issue - should return issue details', async () => {
      const issue = {
        id: 'issue-123',
        userId: 'user-123',
        type: 'Cloud Security',
        title: 'Test Issue',
        description: 'Test Description',
        priority: 'high',
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: 'user-123',
          name: 'Test User',
          email: 'test@example.com',
        },
      }

      mockIssueRepoMethods.findIssueById.mockResolvedValue(issue)

      const req = createMockRequest('GET', undefined, {
        authorization: `Bearer ${authToken}`,
      })

      const response = await getIssueHandler(req, { params: Promise.resolve({ id: 'issue-123' }) })
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.id).toBe('issue-123')
      expect(data.data.title).toBe('Test Issue')
    })

    test('6. update issue fields - should update successfully', async () => {
      const existingIssue = {
        id: 'issue-123',
        userId: 'user-123',
        type: 'Cloud Security',
        title: 'Old Title',
        description: 'Old Description',
        priority: 'low',
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const updatedIssue = {
        ...existingIssue,
        title: 'Updated Title',
        priority: 'critical',
        status: 'in-progress',
      }

      mockIssueRepoMethods.findIssueById.mockResolvedValue(existingIssue)
      mockIssueRepoMethods.updateIssue.mockResolvedValue(updatedIssue)

      const req = createMockRequest(
        'PUT',
        {
          title: 'Updated Title',
          priority: 'critical',
          status: 'in-progress',
        },
        {
          authorization: `Bearer ${authToken}`,
        }
      )

      const response = await updateIssueHandler(req, { params: Promise.resolve({ id: 'issue-123' }) })
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.title).toBe('Updated Title')
      expect(data.data.priority).toBe('critical')
    })

    test('7. delete issue - should delete successfully', async () => {
      const existingIssue = {
        id: 'issue-123',
        userId: 'user-123',
        type: 'Cloud Security',
        title: 'Test Issue',
        description: 'Test Description',
        priority: 'medium',
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockIssueRepoMethods.findIssueById.mockResolvedValue(existingIssue)
      mockIssueRepoMethods.deleteIssue.mockResolvedValue(existingIssue)

      const req = createMockRequest('DELETE', undefined, {
        authorization: `Bearer ${authToken}`,
      })

      const response = await deleteIssueHandler(req, { params: Promise.resolve({ id: 'issue-123' }) })
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toContain('deleted successfully')
      expect(mockIssueRepoMethods.deleteIssue).toHaveBeenCalled()
    })

    test('8. filter by type query - should filter issues by type', async () => {
      const filteredIssues = [
        {
          id: 'issue-1',
          userId: 'user-123',
          type: 'Cloud Security',
          title: 'Cloud Issue',
          description: 'Description',
          priority: 'high',
          status: 'open',
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {
            id: 'user-123',
            name: 'Test User',
            email: 'test@example.com',
          },
        },
      ]

      mockIssueRepoMethods.findIssuesByUserId.mockResolvedValue(filteredIssues)

      const req = new Request('http://localhost:3000/api/issues?type=Cloud%20Security', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })

      const response = await getIssuesHandler(req as any)
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    test('9. search by keyword - should search in title and description', async () => {
      const searchResults = [
        {
          id: 'issue-1',
          userId: 'user-123',
          type: 'Cloud Security',
          title: 'Security Vulnerability',
          description: 'Critical security issue found',
          priority: 'high',
          status: 'open',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      mockIssueRepoMethods.searchIssues.mockResolvedValue(searchResults)

      const req = new Request('http://localhost:3000/api/issues?search=vulnerability', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })

      const response = await getIssuesHandler(req as any)
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    test('10. unauthorized issue access - should reject access to other user issue', async () => {
      const otherUserIssue = {
        id: 'issue-456',
        userId: 'other-user-456',
        type: 'Cloud Security',
        title: 'Other User Issue',
        description: 'This belongs to another user',
        priority: 'high',
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockIssueRepoMethods.findIssueById.mockResolvedValue(otherUserIssue)

      const req = createMockRequest('GET', undefined, {
        authorization: `Bearer ${authToken}`,
      })

      const response = await getIssueHandler(req, { params: Promise.resolve({ id: 'issue-456' }) })
      const data = await getResponseData(response)

      expect(response.status).toBe(403)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Unauthorized')
    })
  })
})
