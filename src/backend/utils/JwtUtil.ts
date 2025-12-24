import jwt from 'jsonwebtoken';

export class JwtUtil {
  private secret: string;
  private expiresIn: string;

  constructor(secret?: string, expiresIn: string = '7d') {
    this.secret = secret || process.env.JWT_SECRET || '';
    this.expiresIn = expiresIn;
  }

  generateToken(payload: object): string {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  verifyToken(token: string): any {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  decodeToken(token: string): any {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }
}
