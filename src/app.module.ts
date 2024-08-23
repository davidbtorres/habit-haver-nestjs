import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HabitsModule } from './habits/habits.module';
@Module({
  imports: [UserModule, HabitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
