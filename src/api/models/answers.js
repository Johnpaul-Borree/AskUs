import pool from '../../dbScema/dbConnect';

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

  updateAnswers(questionAuthor, answerAuthor, questionId, answerId) {
    if (questionAuthor) {
      const query = {
        text: 'UPDATE ask_answers SET prefered_answer = true where question_id = $1 user_id = $2 and id = $3 RETURNING *',
        values: [questionId, questionAuthor, answerId],
      };
