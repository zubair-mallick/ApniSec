import { z } from 'zod';

export class AuthValidator {
  private registerSchema: z.ZodSchema;
  private loginSchema: z.ZodSchema;

  constructor() {
    this.registerSchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
    });

    this.loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(1),
    });
  }

  validateRegister(data: unknown): { name: string; email: string; password: string } {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  validateLogin(data: unknown): { email: string; password: string } {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }
}
