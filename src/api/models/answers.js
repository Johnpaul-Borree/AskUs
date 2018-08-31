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

  markPreferedAnswer(questionId) {
    const query2 = {
      text: 'UPDATE ask_answers set prefered_answer = true where question_id = $1',
      values: [questionId],
    };
    return this.pool.query(query2)
      .then((prefered) => {
        if (prefered.rowCount > 0) {
          return { status: 'success', command: 'prefered' };
        }
        return { status: 'failed', command: 'prefered' };
      })
      .catch((err) => { 
        console.log(err); 
        return err; 
      });
  }

  acceptAnswer(userId, answerId) {
    return this.getMyAnswer(answerId)
      .then((answer) => {
        if (userId !== answer.user_id) return false;
        return true;
      })
      .then((result) => {
        if (result) {
          const query4 = {
            text: 'UPDATE ask_answers set answer_body = $1 where user_id = $1 and id = $2',
            values: [userId, answerId],
          };
          return this.pool.query(query4)
            .then((update) => {
              if (update.rowCount > 0) {
                return { status: 'success', command: 'update' };
              }
              return { status: 'failed', command: 'update' };
            });
        }
        return { status: 'failed', command: 'update' };
      })
      .catch(err => err);
  }

  getMyAnswer(answerId) {
    const query = {
      text: 'SELECT * FROM ask_answers WHERE id = $1',
      values: [answerId],
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

export default Answers;
