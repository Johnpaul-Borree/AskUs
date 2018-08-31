import userControllers from '../controllers/usersController';
import questionControllers from '../controllers/questionsController';
import answerControllers from '../controllers/answersController';

const router = (app) => {
  app.use('/api/v1/auth', userControllers);
  app.use('/api/v1', questionControllers);
  app.use('/api/v1', answerControllers);
  app.use((req, res, next) => {
    res.status(200).json({ status: 'welcome' });
  });
};

export default router;
