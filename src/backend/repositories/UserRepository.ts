import { PrismaClient, User } from '@prisma/client';

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id: string): Promise<User | null> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  async findByEmail(email: string): Promise<User | null> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  async create(data: { name: string; email: string; password: string }): Promise<User> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  async delete(id: string): Promise<void> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }
}
