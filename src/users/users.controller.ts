import { Body, Controller, Get, Post ,UseGuards, Patch, Delete, Param, ParseIntPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


   @UseGuards(JwtAuthGuard)

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  createUser(@Body() registerDto: RegisterDto): Promise<User> {
    return this.usersService.createUser(registerDto);
  }

 @Patch(':id')
updateUser(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateUserDto: UpdateUserDto
) {
  return this.usersService.update(id, updateUserDto);
}


  //  Delete
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

}
