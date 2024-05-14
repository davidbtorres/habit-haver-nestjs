import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guards';
// import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() authPayload: AuthPayloadDto): string {
    if (!authPayload.username) {
      throw new HttpException('Username not provided', HttpStatus.BAD_REQUEST);
    }
    if (!authPayload.password) {
      throw new HttpException('Password not provided', HttpStatus.BAD_REQUEST);
    }
    this.authService.registerUser(authPayload);
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
}
