import express from 'express';
import verifyToken from '../../middleware/authorize';
import Question from '../models/ask_questions';

const router = express.Router();

verifyToken(router);
const question = new Question();
// GET ALL QUESTIONS
router.get('/questions', (req, res) => {
  question.getAllQuestions()
    .then((result) => {
      if (!result) {
        throw new Error();
      }
      const questions = result.rows;
      res.status(200).json({ status: 'success', questions });
    })
    .catch(() => {
      res.status(500).json({ status: 'failed', message: 'Problem getting questions' });
    });
});
// GET A QUESTION
router.get('/questions/:questionId', (req, res) => {
  question.getAnyQuestion(req.params.questionId)
    .then((singleQuestion) => {
      if (singleQuestion) {
        res.status(200).json({ singleQuestion, status: 'success', message: 'returned one question' });
        return;
      }
      res.status(404).json({ status: 'success', message: 'no result found' });
    })
    .catch(() => {
      res.status(500).json({ status: 'failed', message: 'cannot get question' });
    });
});



export default router;
