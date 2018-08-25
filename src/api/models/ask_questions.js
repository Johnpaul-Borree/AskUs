import pool from './dbConnect';
// import User from './ask_user';


class Question {
  constructor() {
    this.pool = pool;
    this.questionBody = null;
    this.topics = null;
    this.userId = null;
  }

  getQuestions(questionId) {
    const query = {
      text: 'SELECT * FROM ask_questions WHERE id = $1 AND ask_user_id = $2',
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
}

export default Question;
