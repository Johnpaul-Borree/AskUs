import express from 'express';
import verifyToken from '../../middleware/authorize';
import Question from '../models/questions';

const router = express.Router();

const question = new Question();
// GET ALL QUESTIONS
router.get('/questions', (req, res) => {
  const username = req.body.username;
  question.fetchAllQuestions()
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
      if (singleQuestion.Question.length <= 0) {
        res.status(404).json({ status: 'success', message: 'no result found' });
        return;
      }
      res.status(200).json({ singleQuestion, status: 'success', message: 'returned one question' });
    })
    .catch(() => {
      res.status(500).json({ status: 'failed', message: 'cannot get question' });
    });
});

verifyToken(router);

router.post('/questions', (req, res) => {
  question.postQuestion({
    userId: req.body.userId,
    questionBody: req.body.questionBody,
  })
    .then((result) => {
      if (result.rows.length <= 0) return res.status(404).json({ status: 200, message: 'Enter Correct question content' });
      const justAdded = result.rows[0];
      justAdded.created_at = new Date(justAdded.created_at).toDateString();
      res.status(200).json({ status: 'success', message: 'Created', justAdded });
    })
    .catch(() => {
      res.status(500).json({ status: 'failed', message: 'Problem creating question' });
    });
});

router.delete('/questions/:questionId', (req, res) => {
  question.deleteQuestion(req.body.userId, req.params.questionId)
    .then((result) => {
      if (result.question.rowCount) {
        res.status(200).json({ status: 'success', message: 'deleted successfully' });
        return;
      }
      res.status(404).json({ status: 'failed', message: 'The question with the given id was not found' });
    })
    .catch(() => {
      res.status(500).json({ status: 'failed', message: 'Something Went Wrong, cannot delete question' });
    });
});

export default router;
