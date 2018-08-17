import express from 'express';

import { getAllQuestions, getQuestionById } from '../controllers/questionsControllers';


const router = express.Router();

// GET /questions
router.get('/', getAllQuestions);

router.get('/:questionId', getQuestionById);


export default router;
