import { Body, Controller, Get, Post ,UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';

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
}
