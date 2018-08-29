import pool from '../../dbScema/dbConnect';


class Question {
  constructor(questionBody, userId) {
    this.pool = pool;
    this.questionBody = questionBody;
    this.userId = userId;
    this.answerNumber = 0;
  }

  postQuestion(input) {
    const query = {
      text: 'INSERT INTO ask_questions(user_id, question_body) VALUES($1, $2) RETURNING *',
      values: [input.userId, input.questionBody],
    };
    return this.pool.query(query)
      .then(result => result)
      .catch(err => err);
  }

  // GET All MY questions
  fetchAllQuestions() {
    const query = {
      text: 'SELECT (ask_questions.id, first_name, last_name, username, description, created_at, question_body, answer_number)FROM ask_questions INNER JOIN ask_users ON ask_questions.user_id = ask_users.id',
    };
    return this.pool.query(query)
      .then(result => result)
      .catch(err => err);
  }

  // GET My questions by id
  getMyQuestion(questionId) {
    const query = {
      text: 'SELECT * FROM ask_questions WHERE user_id = $1 AND id = $2',
      values: [this.userId, questionId],
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

  getAnyQuestion(questionId) {
    const query1 = {
      text: `SELECT 
            (ask_questions.id, 
              first_name, last_name, 
              username, description, 
              created_at, question_body, 
              answer_number
            )FROM ask_questions 
            INNER JOIN ask_users 
            ON ask_questions.user_id = ask_users.id WHERE question_id = $1`,

      values: [questionId],
    };

    const query2 = {
      text: `SELECT 
            (ask_answers.id, 
              first_name, last_name, 
              username, description, 
              created_at, answer_body,
              prefered_answer, updated_at 
            )FROM ask_questions 
            INNER JOIN ask_users 
            ON ask_answers.user_id = ask_users.id WHERE question_id = $1`,

      values: [questionId],
    };

    return this.pool.query(query1)
      .then(() => this.pool.query(query2))
      .catch(err => err);
    // this.pool.query(query1)
    //   .then((result) => {
    //     if (result.rows[0]) {
    //       const question = result.rows;
    //     }
    //     return false;
    //   })
    //   .catch(err => err);
  }

  deleteQuestion(questionId) {
    const query = {
      text: 'DELETE FROM ask_questions WHERE user_id = $1 and id = $2',
      values: [this.userId, questionId],
    };
    return this.pool.query(query)
      .then(result => result)
      .catch(err => err);
  }
}

export default Question;
