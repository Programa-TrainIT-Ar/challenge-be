import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/modules/users/dto/users-dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { Roles } from 'src/schemas/user.schema';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersService } from 'src/modules/users/users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUsers = [
    {
      _id: '60d0fe4f5311236168a109ca',
      name: 'Test User 1',
      email: 'test1@example.com',
      role: Roles.Admin,
    },
    {
      _id: '60d0fe4f5311236168a109cb',
      name: 'Test User 2',
      email: 'test2@example.com',
      role: Roles.Candidate,
    },
  ];

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValueOnce([mockUsers]),
    findById: jest.fn().mockResolvedValueOnce(mockUsers),
    createUser: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn().mockResolvedValueOnce({ delete: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: UsersService, useValue: mockUsersService }],
      controllers: [UsersController],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should get all users', async () => {
      const result = await usersController.findAll();

      expect(usersService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUsers]);
    });
    it('should get all users with query role', async () => {
      const role = Roles.Admin;
      const filteredUsers = [mockUsers[0]];

      mockUsersService.findAll.mockResolvedValueOnce(filteredUsers);

      const result = await usersController.findByRole(role);

      expect(usersService.findAll).toHaveBeenCalledWith(role);
      expect(result).toEqual(filteredUsers);
    });
  });

  describe('findUser', () => {
    it('should get a user by id', async () => {
      const id = 'id';
      const result = await usersController.findById(mockUsers[0]._id);

      expect(usersService.findById).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('createUser', () => {
    it('should post a user', async () => {
      const newUser = {
        name: 'Test 3',
        email: 'test3@test.com',
        role: Roles.Admin,
      };
      mockUsersService.createUser = jest.fn().mockResolvedValueOnce(mockUsers);
      const result = await usersController.createUser(newUser as CreateUserDto);
      expect(usersService.createUser).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('updateUser', () => {
    it('should update user by id', async () => {
      const updatedUser = { ...mockUsers[0], name: 'updated name' };
      const user = { name: 'updated name' };

      mockUsersService.updateById = jest
        .fn()
        .mockResolvedValueOnce(updatedUser);

      const result = await usersController.updateUser(
        mockUsers[0]._id,
        user as UpdateUserDto,
      );

      expect(usersService.updateById).toHaveBeenCalled();
      expect(result).toEqual(updatedUser);
    });
  });

  describe('DeleteUser', () => {
    it('should find and delete user by id', async () => {
      const id = 'id';
      const result = await usersController.deleteUser(mockUsers[0]._id);

      expect(usersService.deleteById).toHaveBeenCalled();
      expect(result).toEqual({ delete: true });
    });
  });
});
