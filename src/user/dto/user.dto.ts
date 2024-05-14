import { IsNotEmpty, IsString } from 'class-validator';
import { HabitDto } from 'src/habits/dto/habit.dto';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string; // should be email

  @IsNotEmpty()
  @IsString()
  password: string;

  habits: HabitDto[];
}
