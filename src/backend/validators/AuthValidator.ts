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
    return this.registerSchema.parse(data) as { name: string; email: string; password: string };
  }

  validateLogin(data: unknown): { email: string; password: string } {
    return this.loginSchema.parse(data) as { email: string; password: string };
  }
}
