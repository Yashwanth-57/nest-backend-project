import { Injectable } from '@nestjs/common';

export type SimpleUser = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

@Injectable()
export class UsersService {
  private users: SimpleUser[] = [];
  private nextId = 1;

  getAllUsers(): SimpleUser[] {
    return this.users;
  }

  createUser(data: { name: string; email: string; password?: string }): SimpleUser {
    const user: SimpleUser = {
      id: this.nextId++,
      name: data.name,
      email: data.email,
      password: data.password,
    };
    this.users.push(user);
    
    return user;
  }
}
