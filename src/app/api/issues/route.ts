import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { IssueHandler } from '@/backend/handlers/IssueHandler';
import { IssueService } from '@/backend/services/IssueService';
import { IssueRepository } from '@/backend/repositories/IssueRepository';
import { IssueValidator } from '@/backend/validators/IssueValidator';

function getIssueHandler() {
  const prisma = new PrismaClient();
  const issueRepository = new IssueRepository(prisma);
  const issueService = new IssueService(issueRepository);
  const issueValidator = new IssueValidator();
  return new IssueHandler(issueService, issueValidator);
}

export async function GET(req: NextRequest) {
  const handler = getIssueHandler();
  return handler.handleGetIssues(req);
}

export async function POST(req: NextRequest) {
  const handler = getIssueHandler();
  return handler.handleCreateIssue(req);
}
