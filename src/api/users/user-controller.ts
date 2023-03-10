import { RequestHandler } from 'express';
import { UserQueryId } from '../../types/types.js';
import { UserModel } from './user-schema.js';

export const getUserByIdController: RequestHandler<UserQueryId> = async (
  req,
  res,
) => {
  const { id } = req.params;

  const user = await UserModel.findById({ _id: id }).exec();

  if (user !== null) {
    return res.status(200).json(user);
  }

  return res.status(404);
};

export const updateUserByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const dbRes = await UserModel.updateOne({ _id: id }, { ...req.body }).exec();
  if (dbRes.matchedCount === 0) {
    res.status(404);
  }

  if (dbRes.modifiedCount === 1) {
    res.status(200).json({ msg: 'Su usuario ha sido modificado' });
  }
};
