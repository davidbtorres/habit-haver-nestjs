import { IsNotEmpty, IsString } from 'class-validator';

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
}
