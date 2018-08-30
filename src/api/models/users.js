import bcrypt from 'bcrypt';
import pool from '../../dbScema/dbConnect';

class User {
  constructor(username, firstName, lastName, email, password, descriptions) {
    this.username = username;
    this.pool = pool;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.descriptions = descriptions;
  }

  signup() {
    const hash = bcrypt.hashSync(this.password, 10);
    const query = {
      text: 'INSERT INTO ask_users(username, first_name, last_name, email, hashed_password) VALUES($1, $2, $3, $4, $5) RETURNING id',
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

  login() {
    const query = {
      text: 'SELECT * FROM ask_users WHERE email = $1',
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
    return this.pool.query('SELECT * FROM ask_users WHERE email = $1', [input.email])
      .then((result) => {
        if (result.rows[0]) {
          return result.rows[0];
        }
        return false;
      })
      .catch(err => err);
  }

  getUser(userId) {
    return this.pool.query(
      `SELECT username, 
      first_name,last_name, 
      descriptions FROM ask_users
      WHERE id = $1`, [userId],
    )
      .then((result) => {
        if (result.rows[0]) {
          return result.rows[0];
        }
        return false;
      })
      .catch(err => err);
  }

  updateUser(userid) {
    const query = {
      text: `UPDATE ask_users,
            SET first_name = $1,
            last_name =$2, descripton = $3 
            WHERE id =$4 RETURNING *`,

      values: [this.firstName, this.lastName, this.descriptions, userid],
    };
    return this.pool.query(query)
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
