import { NextRequest } from 'next/server';
import { UserHandler } from '@/backend/handlers/UserHandler';
import { UserService } from '@/backend/services/UserService';
import { UserRepository } from '@/backend/repositories/UserRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getUserHandler() {
  const userRepository = new UserRepository(prisma);
  const userService = new UserService(userRepository);
  return new UserHandler(userService);
}

export async function GET(req: NextRequest) {
  const handler = getUserHandler();
  return handler.handleGetProfile(req);
}

export async function PUT(req: NextRequest) {
  const handler = getUserHandler();
  return handler.handleUpdateProfile(req);
}
