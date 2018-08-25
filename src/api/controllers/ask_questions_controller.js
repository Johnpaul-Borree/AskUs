import express from 'express';
import verifyToken from '../../middleware/authorize';
import Question from '../models/ask_questions';

const router = express.Router();

verifyToken(router);
const question = new Question();
router.get('/questions', (req, res) => {
  question.userId = req.body.userId;
  console.log(question.userId);

});

export default router;
