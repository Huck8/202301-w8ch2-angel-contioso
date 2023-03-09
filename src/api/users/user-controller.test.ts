import { UserModel } from './user-schema.js';
import { getUserById } from './user-controller.js';
import { Request, Response } from 'express';
import { UserQueryId } from '../../types/types.js';

describe('Given a function to get a user by their id', () => {
  const mockRequest = {
    params: { id: 'mockId' },
  } as Partial<Request<UserQueryId>>;

  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as Partial<Response>;

  const user = {
    name: 'mock',
    surname: 'user',
    email: 'mock@email.com',
    imgURL: 'photo',
    phone: '+34123456789',
  };

  test('When the user exists, then it should respond with its information', async () => {
    UserModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(user) });

    await getUserById(
      mockRequest as Request<UserQueryId>,
      mockResponse as Response,
      jest.fn(),
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(user);
  });

  test('When the user does not exist, then it should respond with a 404 error', async () => {
    UserModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

    await getUserById(
      mockRequest as Request<UserQueryId>,
      mockResponse as Response,
      jest.fn(),
    );

    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});
