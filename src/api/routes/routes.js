import express from 'express';

// import {
//   getAllQuestions,
//   getQuestionById,
//   createQuestion,
//   answerQuestion,
// } from '../controllers/questionsControllers';
import client from '../models/populate_tables';

const router = express.Router();

// // GET /questions
// router.get('/questions', getAllQuestions);

// // GET /questions/<questionId>
// router.get('/questions/:questionId', getQuestionById);

// // POST /questions
// router.post('/questions', createQuestion);

// // POST /questions/<questionId>/answers
// router.post('/questions/:questionId/answers', answerQuestion);

router.post('/', client);
export default router;
