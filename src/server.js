import dotenv from 'dotenv';
import express from 'express';
import routeMiddleware from './api/routes/routes';
import dbconnect from './dbScema/dbConnect';
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 40);


routeMiddleware(app);

const port = process.env.PORT || 3000;

console.log(dbconnect);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export default app;
