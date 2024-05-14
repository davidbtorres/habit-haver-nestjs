import { IsNotEmpty, IsString } from 'class-validator';

export class newHabitPayloadDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
