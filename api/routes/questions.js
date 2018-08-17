import express from 'express';

import { getAllQuestions } from '../controllers/questionsControllers';


const router = express.Router();

// GET /questions
router.get('/', getAllQuestions);


export default router;
