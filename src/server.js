import dotenv from 'dotenv';
import express from 'express';
// import questions from './api/routes/questions';
import client from './api/models/dbConnect';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api/v1/', questions);
app.set('json spaces', 40);


const text = 'INSERT INTO ask_user( username, first_name, last_name, email, hashed_password) VALUES($1, $2, $3, $4, $5) RETURNING *';
const values = ['brianc', 'bernard', 'Luisa', 'brian.m.carlson@gmail.com', '1233345'];

client.query(text, values)
  .then((result) => {
    console.log(result.rows[0]);
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  })
  .catch(e => console.error(e.stack));


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export default app;
