import express from 'express';
import { PORT } from './constants';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT);
