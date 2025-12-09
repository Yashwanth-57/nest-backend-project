import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update.dto';
import { NotFoundException } from '@nestjs/common';




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

 async findByEmail(email: string): Promise<User | null> {
  return this.userRepo.findOne({ where: { email } });

  }

   //  Update logic
 async update(id: number, updateUserDto: UpdateUserDto) {
  const user = await this.userRepo.preload({ id: +id, ...updateUserDto }); // +id converts string to number
  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }
  return this.userRepo.save(user);
}


  //  Delete logic
  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userRepo.remove(user);
  }

  



}

