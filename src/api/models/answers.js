import pool from './dbConnect';

class Answers {
  constructor(userId, questionId, answerBody) {
    this.pool = pool;
    this.questionId = questionId;
    this.answerBody = answerBody;
  }

  postAnswer(questionId, input) {
    const query = {
      text: 'INSERT INTO ask_answers(question_id, user_id, answer_body) VALUES($1, $2, $3) RETURNING *',
      values: [questionId, input.userId, input.answerBody],
    };
    return this.pool.query(query)
      .then(result => result)
      .catch(err => err);
  }
}

export default Answers;
