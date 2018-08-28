import express from 'express';
import verifyToken from '../../middleware/authorize';
import Answers from '../models/answers';

const router = express.Router();

verifyToken(router);

const answer = new Answers();

router.post('/questions/:questionId/answers', (req, res) => {
  answer.postAnswer(req.params.questionId, {
    userId: req.body.userId,
    answerBody: req.body.answerBody,
  })
    .then((result) => {
      console.log(result);
      const justAdded = result.rows[0];
      justAdded.created_at = new Date(justAdded.created_at).toDateString();
      res.status(200).json({ status: 'success', message: 'Created', justAdded });
    })
    .catch(() => {
      res.status(500).json({ status: 'failed', message: 'Problem creating question' });
    });
});

export default router;
