import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UpdateUserDto } from '../users/dto/update.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: User = {
    id: 1,
    name: 'Yash',
    email: 'yash@example.com',
    password: 'hashedPassword',
  };

  const mockUsersService = {
    getAllUsers: jest.fn().mockResolvedValue([mockUser]),
    createUser: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue({ ...mockUser, name: 'Updated Name' }),
    remove: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getUsers should return array of users', async () => {
    const result = await controller.getUsers();
    expect(result).toEqual([mockUser]);
    expect(mockUsersService.getAllUsers).toHaveBeenCalled();
  });

  it('createUser should create a user', async () => {
    const result = await controller.createUser({
      name: 'Yash',
      email: 'yash@example.com',
      password: 'password',
    });
    expect(result).toEqual(mockUser);
    expect(mockUsersService.createUser).toHaveBeenCalled();
  });

  it('updateUser should update user', async () => {
    const updateDto: UpdateUserDto = { name: 'Updated Name' };
    const result = await controller.updateUser(1, updateDto);
    expect(result.name).toBe('Updated Name');
    expect(mockUsersService.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('deleteUser should remove user', async () => {
    const result = await controller.deleteUser(1);
    expect(result).toEqual(mockUser);
    expect(mockUsersService.remove).toHaveBeenCalledWith(1);
  });
});
