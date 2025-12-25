import { PrismaClient, User } from '@prisma/client';

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: { name: string; email: string; password: string }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  // Aliases for backward compatibility
  async findUserById(id: string) {
    return this.findById(id);
  }

  async findUserByEmail(email: string) {
    return this.findByEmail(email);
  }

  async createUser(data: { name: string; email: string; password: string }) {
    return this.create(data);
  }

  async updateUser(id: string, data: any) {
    return this.update(id, data);
  }
}
