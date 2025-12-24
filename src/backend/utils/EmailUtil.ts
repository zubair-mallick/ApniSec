import { Resend } from 'resend';

export class EmailUtil {
  private resend: Resend;
  private from: string;

  constructor(apiKey?: string, from: string = 'onboarding@resend.dev') {
    this.resend = new Resend(apiKey || process.env.RESEND_API_KEY);
    this.from = from;
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  async sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  async sendVerificationEmail(to: string, verificationToken: string): Promise<void> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }
}
