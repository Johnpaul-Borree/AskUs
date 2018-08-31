import express from 'express';
import verifyToken from '../../middleware/authorize';
import Answers from '../models/answers';
import Question from '../models/questions';

const router = express.Router();

verifyToken(router);

const answer = new Answers();
const question = new Question();


router.post('/questions/:questionId/answers', (req, res) => {
  answer.postAnswer(req.params.questionId, {
    userId: req.body.userId,
    answerBody: req.body.answerBody,
  })
    .then((result) => {
      const justAdded = result.rows[0];
      justAdded.created_at = new Date(justAdded.created_at).toDateString();
      res.status(200).json({ status: 'success', message: 'Created', justAdded });
    })
    .catch(() => {
      res.status(500).json({ status: 'failed', message: 'Problem creating question' });
    });
});

router.put('/questions/:questionId/answers/:answerId', (req, res) => {
  const userId = req.body.userId;
  question.userId = userId;
  question.getMyQuestion(req.params.questionId)
    .then((question) => {
      if (userId === question.user_id) {
        return answer.markPreferedAnswer(req.params.questionId);
      }
      return answer.acceptAnswer(userId, req.params.answerId);
    })
    .then((result) => {
      if (result.command === 'update' && result.status === 'success') {
        res.status(200).json({ message: 'Answer accepted', status: 'Success' });
        return;
      }
      if (result.command === 'prefered' && result.status === 'success') {
        res.status(200).json({ message: 'Answer marked as prefered', status: 'Success' });
        return;
      }
      throw new Error();
    })
    .catch(() => {
      res.status(500).json({ status: 'failed', message: 'Problem updating' });
    });
});

export default router;
