import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from '../users/dto/register.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { name, email, password } = registerDto;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in DB
    return this.usersService.createUser({
      name,
      email,
      password: hashedPassword,
    });
  }
}
