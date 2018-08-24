import bcrypt from 'bcrypt';
import pool from './dbConnect';

class User {
  constructor(username, firstName, lastName, email, password) {
    this.username = username;
    this.pool = pool;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  askSignup() {
    const hash = bcrypt.hashSync(this.password, 10);
    const query = {
      text: 'INSERT INTO ask_user(username, first_name, last_name, email, hashed_password) VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [this.username, this.firstName, this.lastName, this.email, hash],
    };
    return this.pool.query(query)
      .then((result) => {
        const userId = result.rows[0].id;
        // wrong input
        if (!userId) throw new Error();
      })
      .catch(() => { throw new Error(); });
  }

  askLogin() {
    const query = {
      text: 'SELECT * FROM ask_user WHERE email = $1',
      values: [this.email],
    };

    return this.pool.query(query)
      .then((result) => {
        // User not found in db
        if (!result.rows[0]) return ({ code: 1, id: null });
        // User found in db
        const passwordMatch = bcrypt.compareSync(this.password, result.rows[0].hashed_password);
        if (passwordMatch) {
          return ({ code: 2, id: result.rows[0].id });
        }
        return ({ code: 3, id: null });
      })
      .catch(err => err);
  }

  checkUserExistBefore(input) {
    this.username = input.username;
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.email = input.email;
    this.password = input.password;
    return this.pool.query('SELECT * FROM ask_user WHERE email = $1', [input.email])
      .then((result) => {
        if (result.rows[0]) {
          return result.rows[0];
        }
        return false;
      })
      .catch(err => err);
  }

  getUser() {
    const id = this.userId;
    return this.pool.query(
      `SELECT username, 
      first_name, 
      last_name, 
      email FROM ask_user
      WHERE id = $1`, [id],
    )
      .then((result) => {
        if (result.rows[0]) {
          return result.rows[0];
        }
        return false;
      })
      .catch(err => err);
  }
}
export default User;
