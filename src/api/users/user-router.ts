// A import express from 'express';
// import {
//   getUserByIdController,
//   updateUserByIdController,
// } from './user-controller.js';

// const router = express.Router();

// router.route('/:id').get(getUserByIdController);
// router.route('/:id').put(updateUserByIdController);

// export default router;

import express from 'express';
import {
  updateUserByIdController,
  getUserByIdController,
} from './user-controller.js';

const router = express.Router();

router.route('/:id').get(getUserByIdController).patch(updateUserByIdController);
export default router;
