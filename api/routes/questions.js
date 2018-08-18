import express from 'express';

import {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  answerQuestion,
} from '../controllers/questionsControllers';


const router = express.Router();

// GET /questions
router.get('/', getAllQuestions);

// GET /questions/<questionId>
router.get('/:questionId', getQuestionById);

// POST /questions
router.post('/', createQuestion);

// POST /questions/<questionId>/answers
router.post('/:questionId/answers', answerQuestion);


export default router;
