// users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service'; 
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../users/dto/update.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  const mockUser = {
    id: 1,
    name: 'Yash',
    email: 'yash@example.com',
    password: 'hashedPassword',
  };

  const usersArray = [mockUser];

  const mockRepo = {
    find: jest.fn().mockResolvedValue(usersArray),

    create: jest.fn().mockReturnValue(mockUser),

    // FIXED SAVE → returns updated user instead of old value
    save: jest.fn().mockImplementation((user) => Promise.resolve(user)),

    findOne: jest.fn().mockImplementation(({ where: { id, email } }) => {
      if (id && id === mockUser.id) return Promise.resolve(mockUser);
      if (email && email === mockUser.email) return Promise.resolve(mockUser);
      return Promise.resolve(null);
    }),

    preload: jest.fn().mockImplementation((data) => {
      if (data.id === mockUser.id) return Promise.resolve({ ...mockUser, ...data });
      return Promise.resolve(null);
    }),

    remove: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAllUsers should return all users', async () => {
    const users = await service.getAllUsers();
    expect(users).toEqual(usersArray);
    expect(repo.find).toHaveBeenCalled();
  });

  it('createUser should create a new user', async () => {
    const newUser = { name: 'Yash', email: 'yash@example.com', password: 'hashedPassword' };
    const user = await service.createUser(newUser);

    expect(user).toEqual(mockUser);
    expect(repo.create).toHaveBeenCalledWith(newUser);
    expect(repo.save).toHaveBeenCalled();
  });

  it('findByEmail should return a user if found', async () => {
    const user = await service.findByEmail('yash@example.com');
    expect(user).toEqual(mockUser);
  });

  it('update should update a user if found', async () => {
    const updateDto: UpdateUserDto = { name: 'Updated Name' };
    const updatedUser = await service.update(1, updateDto);

    expect(updatedUser.name).toBe('Updated Name');
  });

  it('update should throw NotFoundException if user not found', async () => {
    const updateDto: UpdateUserDto = { name: 'Updated Name' };
    await expect(service.update(999, updateDto)).rejects.toThrow(NotFoundException);
  });

  it('remove should delete a user if found', async () => {
    const user = await service.remove(1);

    expect(user).toEqual(mockUser);
    expect(repo.remove).toHaveBeenCalledWith(mockUser);
  });

  it('remove should throw NotFoundException if user not found', async () => {
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
