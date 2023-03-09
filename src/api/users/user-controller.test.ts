import { UserModel } from './user-schema.js';
import { getUserById, updateUserById } from './user-controller.js';
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

describe('Given an updateById', () => {
  const newUser = {
    name: 'mock',
    surname: 'user',
    email: 'mock@email.com',
    imgURL: 'photo',
    phone: '+34123456789',
  };

  const request = {
    params: { id: 'validUserId' },
    body: newUser,
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  test('When the user exist, then it should response the user updated', async () => {
    UserModel.updateOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValueOnce({ modifiedCount: 1 }),
    }));

    await updateUserById(request as Request, response as Response, jest.fn());

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      msg: 'Su usuario ha sido modificado',
    });
    expect(UserModel.updateOne).toHaveBeenCalledWith(
      { _id: 'validUserId' },
      { ...request.body },
    );
  });

  test('When the user not exist, then it should response with not found', async () => {
    UserModel.updateOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValueOnce({ matchedCount: 0 }),
    }));

    await updateUserById(request as Request, response as Response, jest.fn());

    expect(response.status).toHaveBeenCalledWith(404);
  });
});
