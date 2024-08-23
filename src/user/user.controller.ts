import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserRegistrationDto } from './dto/userRegistration.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() newUserPayload: UserRegistrationDto): string {
    console.log(newUserPayload);
    if (!newUserPayload.username) {
      throw new HttpException('Username not provided', HttpStatus.BAD_REQUEST);
    }
    if (!newUserPayload.password) {
      throw new HttpException('Password not provided', HttpStatus.BAD_REQUEST);
    }
    this.userService.register(newUserPayload);
    return 'Registration successful';
  }

  @Post('login')
  login(@Body() { username, password }) {
    if (!username) {
      throw new HttpException('Username not provided', HttpStatus.BAD_REQUEST);
    }
    if (!password) {
      throw new HttpException('Password not provided', HttpStatus.BAD_REQUEST);
    }
    const result = this.userService.login(username, password);
    if (result) {
      // login successful
      // current user set
      // page should be home rather than login/signup
    }
  }
}
