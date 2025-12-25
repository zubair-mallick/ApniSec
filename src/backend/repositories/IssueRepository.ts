import { PrismaClient } from "@prisma/client";

const defaultPrisma = new PrismaClient();

export interface CreateIssueData {
  userId: string;
  type: string;
  title: string;
  description: string;
  priority?: string;
  status?: string;
}

export interface UpdateIssueData {
  type?: string;
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
}

export class IssueRepository {
  private prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || defaultPrisma;
  }

  async createIssue(data: CreateIssueData) {
    return this.prisma.issue.create({ data });
  }

  async findIssueById(id: string) {
    return this.prisma.issue.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, email: true } } }
    });
  }

  async findIssuesByUserId(userId: string, filters?: { type?: string; status?: string }) {
    const where: any = { userId };
    
    if (filters?.type) {
      where.type = filters.type;
    }
    
    if (filters?.status) {
      where.status = filters.status;
    }

    return this.prisma.issue.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, name: true, email: true } } }
    });
  }

  async updateIssue(id: string, data: UpdateIssueData) {
    return this.prisma.issue.update({
      where: { id },
      data
    });
  }

  async deleteIssue(id: string) {
    return this.prisma.issue.delete({ where: { id } });
  }

  async countUserIssues(userId: string) {
    return this.prisma.issue.count({ where: { userId } });
  }

  async searchIssues(userId: string, searchTerm: string) {
    return this.prisma.issue.findMany({
      where: {
        userId,
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
