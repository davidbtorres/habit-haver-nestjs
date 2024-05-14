import { Injectable } from '@nestjs/common';
import { HabitDto } from './dto/habit.dto';

@Injectable()
export class HabitsService {
  async addHabitToUser(userId: string, habitDto: HabitDto) {
    // Logic to associate the habit with the user
    // This might involve fetching the user from a database and adding the habit to their profile
    // For demonstration purposes, I'll just return the habit DTO
    return habitDto;
  }
}
