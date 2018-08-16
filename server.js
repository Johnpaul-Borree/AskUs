import express from 'express';
import routes from './api/routes/questions';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, THis is Express');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
