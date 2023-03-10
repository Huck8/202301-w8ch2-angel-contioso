import express from 'express';
import { getUserByIdController } from './user-controller.js';

const router = express.Router();

router.route('/:id').get(getUserByIdController);

export default router;
