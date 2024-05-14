import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateUser({ username, password }: AuthPayloadDto) {
    const user = this.userService.findByUsername(username);
    if (user && user.password === password) {
      console.log('user found and password accepted, about to sign');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfo } = user;
      console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
      return this.jwtService.sign(userInfo);
    }
    return undefined;
  }
}
