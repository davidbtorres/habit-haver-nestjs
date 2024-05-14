import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    console.log(
      'in auth.service validateUser. attempting login with: ' +
        username +
        ', ' +
        password,
    );
    const user = this.userService.findByUsername(username);
    console.log('user found: ' + user?.username);
    if (user && user.password === password) {
      console.log('user found and password accepted, about to sign');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfo } = user;
      return this.jwtService.sign(userInfo);
    }
    return undefined;
  }

  registerUser({ username, password }: AuthPayloadDto) {
    const existingUser = this.userService.findByUsername(username);
    if (existingUser) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.userService.register(username, password);
  }
}
