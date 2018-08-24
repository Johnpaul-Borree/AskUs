import pool from './dbConnect';

class Question {
  constructor(userId, questionBody, topics) {
    this.pool = pool;
    this.questionBody = questionBody;
    this.topics = topics;
  }

  postQuestions() {
    const query = {
      text: 'INSERT INTO ask_questions(question_body, topics) VALUES($1, $2) RETURNING *',
      values: [this.questionBody, this.topics],
    };

    return this.pool.query(query)
      .then((result) => {
        const questionId = result.rows[0].id;
        if (!questionId) throw new Error();
      })
      .catch(() => { throw new Error(); });
  }
}

export default Question;
