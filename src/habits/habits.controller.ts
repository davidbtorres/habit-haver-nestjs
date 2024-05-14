import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { HabitDto } from './dto/habit.dto';
import { HabitsService } from './habits.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { v4 as uuidv4 } from 'uuid';
import { newHabitPayloadDto } from './dto/newHabitPayload.dto';

@Controller('habits')
@UseGuards(JwtAuthGuard)
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post('add')
  async addHabitToUser(
    @Req() req,
    @Body() newHabitPayload: newHabitPayloadDto,
  ) {
    const currentUser = req.user;

    console.log(currentUser);

    const newHabitId = uuidv4();

    const newHabit: HabitDto = {
      id: newHabitId,
      ...newHabitPayload,
      streakCount: 0,
    };

    currentUser.habits = [...currentUser.habits, newHabit];

    console.log(currentUser);
    return currentUser;
    //return this.habitsService.addHabitToUser(userId, habitDto);
  }
}
