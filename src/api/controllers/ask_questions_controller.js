import express from 'express';
import verifyToken from '../../middleware/authorize';
import Question from '../models/ask_questions';

const router = express.Router();

verifyToken(router);
const question = new Question();
// GET ALL QUESTIONS
router.get('/questions', (req, res) => {
  const username = req.body.username;
  question.getAllQuestions()
    .then((result) => {
      if (!result) {
        throw new Error();
      }
      const questions = result.rows;
      res.status(200).json({ status: 'success', username, questions });
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

router.post('/questions', (req, res) => {
  question.postQuestion({
    userId: req.body.userId,
    questionBody: req.body.questionBody,
  })
    .then((result) => {
      console.log(req.body.userId);
      const justAdded = result.rows[0];
      justAdded.created_At = new Date(justAdded.created_At).toDateString();
      res.status(200).json({ status: 'success', message: 'Created', justAdded });
    })
    .catch(() => {
      res.status(500).json({ status: 'failed', message: 'Problem creating question' });
    });
});

router.delete('/questions/:questionId', (req, res) => {
  question.userId = req.body.userId;
  question.deleteQuestion(req.params.questionId)
    .then((result) => {
      if (result.rowCount) {
        res.status(200).json({ status: 'success', message: 'deleted successfully' });
        return;
      }
      res.status(404).json({ status: 'failed', message: 'Entry not found' });
    })
    .catch(() => {
      res.status(500).json({ status: 'failed', message: 'Something Went Wrong, cannot delete question' });
    });
});

export default router;
