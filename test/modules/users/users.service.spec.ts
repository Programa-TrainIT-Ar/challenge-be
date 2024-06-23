import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UsersService } from 'src/modules/users/users.service';
import { Roles, User } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/modules/users/dto/users-dtos/create-user.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<User>;

  const mockUser = {
    _id: '665bf1c88b50013f029168e0',
    name: 'Test',
    email: 'test@test.com',
    role: Roles.Admin,
  };

  const mockUsersService = {
    findById: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('Tests on findAll', () => {
    it('should return an array of users if no role is provided', async () => {
      jest.spyOn(userModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);

      const result = await usersService.findAll();
      expect(result).toEqual(mockUser);
    });

    it('should throw a NotFoundException if no users with the provided role are found', async () => {
      jest.spyOn(userModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      } as any);

      await expect(usersService.findByRole(Roles.Evaluator)).rejects.toThrow(
        NotFoundException,
      );
      expect(userModel.find).toHaveBeenCalledWith({ role: Roles.Evaluator });
    });
  });

  describe('Tests on findById', () => {
    it('should find and return a user by ID', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValue(mockUser);

      const result = await usersService.findById(mockUser._id);

      expect(userModel.findById).toHaveBeenCalledWith(mockUser._id);
      expect(result).toEqual(mockUser);
    });

    it('should throw BadRequestException if invalid Id is provided', async () => {
      const id = 'invalid-id';

      const isValidObjectIdMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);

      await expect(usersService.findById(id)).rejects.toThrow(
        BadRequestException,
      );
      expect(isValidObjectIdMock).toHaveBeenCalledWith(id);
      isValidObjectIdMock.mockRestore();
    });

    it('should throw NotFoundException if User is not found', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValue(null);

      await expect(usersService.findById(mockUser._id)).rejects.toThrow(
        NotFoundException,
      );

      expect(userModel.findById).toHaveBeenCalledWith(mockUser._id);
    });
  });

  describe('Test on createUser', () => {
    it('should create and return a User', async () => {
      const newUser = {
        name: 'Test 3',
        email: 'test3@test.com',
        role: Roles.Admin,
      };
      jest
        .spyOn(userModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockUser as any));
      const result = await usersService.createUser(newUser as CreateUserDto);

      expect(result).toEqual(mockUser);
      expect(userModel.create).toHaveBeenCalledWith(newUser);
    });
  });

  describe('Test on updateUser', () => {
    it('should update and return a User', async () => {
      const updatedUser = { ...mockUser, name: 'updated name' };
      const user = { name: 'updated name' };

      jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(updatedUser);

      const result = await usersService.updateById(mockUser._id, user as User);

      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockUser._id,
        user,
        {
          new: true,
          runValidators: true,
        },
      );
      expect(result.name).toEqual(user.name);
    });
  });

  describe('Test on deleteById', () => {
    it('should delete a User', async () => {
      jest.spyOn(userModel, 'findByIdAndDelete').mockResolvedValue(mockUser);

      const result = await usersService.deleteById(mockUser._id);

      expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(mockUser._id);
      expect(result).toEqual(mockUser);
    });
  });
});
