import pool from './dbConnect';

export default class CreateTableSchema {
  constructor() {
    this.pool = pool;
    this.createUsersTable = `CREATE TABLE IF NOT EXISTS ask_users(
        id serial PRIMARY KEY NOT NULL,
        username varchar(255) NOT NULL,
        first_name varchar(255),
        last_name varchar(255), 
        email varchar(255) NOT NULL,
        hashed_password varchar(255) NOT NULL,
        description varchar(255)
      )`;

    this.createQuestionsTable = `CREATE TABLE IF NOT EXISTS ask_questions(
        id serial PRIMARY KEY NOT NULL,
        user_id integer NOT NULL,
        created_at timestamp DEFAULT NOW(),
        question_body text NOT NULL,
        answer_number integer
      )`;

    this.createAnswersTable = `CREATE TABLE IF NOT EXISTS ask_answers(
        id serial PRIMARY KEY NOT NULL,
        user_id integer NOT NULL,
        question_id integer NOT NULL,
        created_at timestamp DEFAULT NOW(),
        answer_body text NOT NULL,
        prefered_answer boolean DEFAULT false,
        updated_at timestamp
      )`;
  }


  create() {
    return this.pool.query(this.createUsersTable)
      .then(() => this.pool.query(this.createQuestionsTable))
      .then(() => this.pool.query(this.createAnswersTable))
      .then(() => this.pool.end())
      .catch(err => err);
  }
}

new CreateTableSchema().create();
