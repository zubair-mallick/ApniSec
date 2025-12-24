import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/UserRepository';
import { JwtUtil } from '../utils/JwtUtil';
import { EmailUtil } from '../utils/EmailUtil';

export class AuthService {
  private userRepository: UserRepository;
  private jwtUtil: JwtUtil;
  private emailUtil: EmailUtil;
  private saltRounds: number;

  constructor(
    userRepository: UserRepository,
    jwtUtil: JwtUtil,
    emailUtil: EmailUtil,
    saltRounds: number = 10
  ) {
    this.userRepository = userRepository;
    this.jwtUtil = jwtUtil;
    this.emailUtil = emailUtil;
    this.saltRounds = saltRounds;
  }

  async register(name: string, email: string, password: string): Promise<{ token: string; user: any }> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  async getUserById(userId: string): Promise<any> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  async logout(userId: string): Promise<void> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  private async hashPassword(password: string): Promise<string> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    // TODO: Implement in Phase-2
    throw new Error('Not implemented');
  }
}
