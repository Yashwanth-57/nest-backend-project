import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>, // DB connection
  ) {}

  // GET ALL USERS
  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  // CREATE USER
  async createUser(data: { name: string; email: string; password: string }): Promise<User> {
    const user = this.userRepo.create(data); // create entity instance
    return this.userRepo.save(user); // save to DB
  }
}

