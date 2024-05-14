import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { HabitDto } from 'src/habits/dto/habit.dto';
import { v4 as uuidv4 } from 'uuid';

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

  register(username: string, password: string): UserDto {
    const id = uuidv4();
    console.log('in user.service register. attempting new user creation');
    console.log(this.users);
    console.log(username + ', ' + password);
    const newUser: UserDto = {
      id,
      username,
      password,
      habits: [] as HabitDto[],
    };
    this.users.push(newUser);
    console.log(this.users);
    return newUser;
  }

  findByUsername(username: string): UserDto | undefined {
    console.log('attempting find by username for: ' + username);
    console.log(this.users);
    return this.users.find((user) => user.username === username);
  }

  findById(id: string): UserDto | undefined {
    return this.users.find((user) => user.id === id);
  }

  authenticate(username: string, password: string): UserDto | undefined {
    const user = this.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return undefined;
  }
}
