import express from 'express';

import { getAllQuestions, getQuestionById, createQuestion } from '../controllers/questionsControllers';


const router = express.Router();

// GET /questions
router.get('/', getAllQuestions);

router.get('/:questionId', getQuestionById);

router.post('/', createQuestion);


export default router;
