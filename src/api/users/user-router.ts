import express from 'express';
import { getUserById } from './user-controller.js';

const router = express.Router();

router.route('/:id').get(getUserById);

export default router;
