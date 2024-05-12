import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRegistrationDto } from 'src/user/dto/userRegistration.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() credentials: UserRegistrationDto): string {
    if (!credentials.username) {
      throw new HttpException('Username not provided', HttpStatus.BAD_REQUEST);
    }
    if (!credentials.password) {
      throw new HttpException('Password not provided', HttpStatus.BAD_REQUEST);
    }
    const { username, password } = credentials;
    const existingUser = this.userService.findByUsername(username);
    console.log(`username: ${username}\npassword: ${password}`);
    if (existingUser) {
      return 'Username already exists';
    }
    this.userService.register(username, password);
    return 'Registration successful';
  }

  @Post('login')
  login(@Body() credentials: UserRegistrationDto): string {
    if (!credentials.username) {
      throw new HttpException('Username not provided', HttpStatus.BAD_REQUEST);
    }
    if (!credentials.password) {
      throw new HttpException('Password not provided', HttpStatus.BAD_REQUEST);
    }
    const { username, password } = credentials;
    const user = this.userService.authenticate(username, password);
    console.log(`username: ${username}\npassword: ${password}`);
    if (user) {
      return 'Login successful';
    } else {
      return 'Invalid username or password';
    }
  }
}
