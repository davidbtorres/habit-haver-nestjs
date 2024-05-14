import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HabitDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  streakCount: number;
}
