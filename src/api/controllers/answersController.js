import express from 'express';
import verifyToken from '../../middleware/authorize';
import Answers from '../models/answers';


const router = express.Router();

verifyToken(router);

const answer = new Answers();
// const question = new Questions();

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

// router.put('/questions/:questionId/answers/:answerId', (req, res) => {
//   const userId = req.body.userId;

//   answer.acceptAnswer(userId, req.params.questionId, req.params.answerId)
//     .then((results) => {
//       console.log(results.rows[0]);
//       res.status(200).json({ status: 'success', message: 'Updated' });
//     })
//     .catch(() => {
//       res.status(500).json({ status: 'failed', message: 'Problem updating' });
//     });
// });

export default router;
