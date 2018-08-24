import express from 'express';
import authorizeToken from '../../middleware/authorize';
import Questions from '../models/ask_questions';

const router = express.Router();

// post questions

router.post('/questions', authorizeToken, (req, res) => {
  const question = new Questions();
  question.id = req.body.id;
  question.questionBody = req.body.questionBody;
  question.createdAt = req.body.createdAt;
  question.answerNumber = req.body.answerNumber;
  const user = req.user.id;

  question.postQuestions()
    .then((result) => {
      res.status(200).json({ createdBY: user, question });
      console.log(result.rows[0]);
    });
});
