import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService, SimpleUser } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  getUsers(): SimpleUser[] {
    return this.usersService.getAllUsers();
  }

  // POST /users
  @Post()
  createUser(@Body() body: { name: string; email: string; password?: string }) {
    return this.usersService.createUser(body);
  }
}
