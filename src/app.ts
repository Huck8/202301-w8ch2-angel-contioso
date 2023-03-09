import express from 'express';
import cors from 'cors';
import apiRouter from './api/api-router.js';

const app = express();

app.use(cors());
app.use('/api/v1', apiRouter);

app.disable('x-powered-by');
app.get('/', (req, res) => {
  res.json('Server is working!!');
});

app.use(express.json());

export default app;
