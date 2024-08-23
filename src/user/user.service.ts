import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { HabitDto } from 'src/habits/dto/habit.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserRegistrationDto } from './dto/userRegistration.dto';

@Injectable()
export class UserService {
  private users: UserDto[] = [
    {
      id: '21bf0b1c-39cf-4789-88fa-d6794fef4656',
      username: 'john',
      password: 'secure1234',
      habits: [],
    },
  ];

  private currentUser: UserDto = null;

  register(newUserPayload: UserRegistrationDto): UserDto {
    const id = uuidv4();
    const username = newUserPayload.username;

    if (this.users.some((user) => user.username === username)) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = newUserPayload.password;
    const newUser: UserDto = {
      id,
      username,
      password,
      habits: [] as HabitDto[],
    };
    this.users.push(newUser);
    return newUser;
  }

  login(username: string, password: string): boolean {
    console.log(username);
    const user = this.findByUsername(username);
    if (user && user.password === password) {
      this.currentUser = user;
      console.log(
        `login successful!\nCurrent user: ${JSON.stringify(this.currentUser)}`,
      );
      return true;
    }
    // return error for username and password combination not being found
    console.log('login failed');
    return false;
  }

  findByUsername(username: string): UserDto | undefined {
    console.log(`attempting find by username for: ${username}`);
    console.log(this.users);
    return this.users.find((user) => user.username === username);
  }

  findById(id: string): UserDto | undefined {
    return this.users.find((user) => user.id === id);
  }
}
