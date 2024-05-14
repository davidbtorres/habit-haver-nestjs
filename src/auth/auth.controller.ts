import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRegistrationDto } from 'src/user/dto/userRegistration.dto';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guards';
// import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
  @UseGuards(LocalGuard)
  login(@Body() authPayload: AuthPayloadDto) {
    const user = this.authService.validateUser(authPayload);
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  // @Get('status')
  // @UseGuards(JwtAuthGuard)
  // status(Req() req) {
  //   return req.user
  // }
}
