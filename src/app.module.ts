import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, UserService],
})
export class AppModule {}
