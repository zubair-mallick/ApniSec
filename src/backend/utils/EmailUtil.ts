import { Resend } from 'resend';

export class EmailUtil {
  static async sendWelcomeEmail(to: string, name: string): Promise<void> {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject: 'Welcome to ApniSec!',
        html: `<h1>Welcome ${name}!</h1><p>Thank you for registering with ApniSec. We're excited to have you on board.</p>`
      });
      console.log(`Welcome email sent to ${to}`);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // Don't throw - registration should succeed even if email fails
    }
  }
}
