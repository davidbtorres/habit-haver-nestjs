import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { HabitsModule } from './habits/habits.module';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [UserModule, AuthModule, HabitsModule],
  controllers: [AppController, AuthController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule {}
