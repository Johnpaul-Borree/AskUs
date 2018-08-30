import dotenv from 'dotenv';
import express from 'express';
import routeMiddleware from './api/routes/routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 40);

app.get('/', (req, res) => {
  res.send('Welcome to ASKus');
});

routeMiddleware(app);

console.log(process.env.DB_CONNECTION_URL);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export default app;
