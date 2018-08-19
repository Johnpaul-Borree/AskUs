import express from 'express';

import questions from './api/routes/questions';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', questions);

app.set('json spaces', 40);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export default app;
