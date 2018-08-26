import express from 'express';
import verifyToken from '../../middleware/authorize';
import Question from '../models/ask_questions';
// import User from '../models/ask_user';

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


export default router;
