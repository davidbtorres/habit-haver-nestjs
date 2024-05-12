import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users: UserDto[] = [];

  register(username: string, password: string): UserDto {
    const id = String(this.users.length + 1);
    const newUser: UserDto = { id, username, password };
    this.users.push(newUser);
    return newUser;
  }

  findByUsername(username: string): UserDto | undefined {
    return this.users.find((user) => user.username === username);
  }

  findBId(id: string): UserDto | undefined {
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
