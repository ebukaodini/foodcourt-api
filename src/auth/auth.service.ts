import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelClass } from 'objection';
import { UserModel } from '../database/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.modelClass
      .query()
      .select('*')
      .where({ email })
      .first();

    if (user && user.password === password) {
      const { id, email, role, createdAt } = user;
      return { id, email, role, createdAt };
    }
    return null;
  }

  async login(user: UserModel) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = user;
    const payload = { email: user.email, role: user.role, sub: user.id };
    return {
      user: rest,
      authToken: this.jwtService.sign(payload),
    };
  }
}
