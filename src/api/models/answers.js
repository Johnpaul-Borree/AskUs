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

  // acceptAnswer(userId, questionId, answerId) {
  //   const query = {
  //     text: 'SELECT * FROM ask_questions where userId = $1 and id = $2',
  //     values: [userId, questionId],
  //   };
  //   this.pool.query(query)
  //     .then((result) => {
  //       if (result.rows) {
  //         // Accept Answer
  //         const query2 = {
  //           text: 'UPDATE ask_answers set prefered_answer = false where userId = $1 and id = $2',
  //           values: [userId, answerId],
  //         };
  //         return this.pool.query(query2)
  //           .then((prefered) => {
  //             console.log(prefered);
  //           })
  //           .catch(err => err);
  //       } console.log('UNAUTHORIZED');
  //     })
  //     .catch(err => err);

  //   const query3 = {
  //     text: 'SELECT * FROM ask_answers where userId = $1 and id = $1',
  //     values: [userId, answerId],
  //   };
  //   this.pool.query(query3)
  //     .then((output) => {
  //       if (output.rows) {
  //         const query4 = {
  //           text: 'UPDATE ask_answers set answer_body = $1 where userId = $1 and id = $2',
  //           values: [userId, answerId],
  //         };
  //         return this.pool.query(query4)
  //           .then((prefered) => {
  //             console.log(prefered);
  //           })
  //           .catch(err => err);
  //       } console.log('UNAUTHORIZED');
  //     })
  //     .catch(err => err);
  // }
}

export default Answers;
