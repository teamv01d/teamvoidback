import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/collections/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && user.password === pass) {
      //const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
