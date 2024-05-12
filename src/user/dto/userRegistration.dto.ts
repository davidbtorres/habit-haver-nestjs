import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegistrationDto {
  @IsNotEmpty()
  @IsString()
  username: string; // should be email

  @IsNotEmpty()
  @IsString()
  password: string;
}
