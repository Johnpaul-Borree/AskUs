import userControllers from '../controllers/usersController';
import questionControllers from '../controllers/questionsController';
import answerControllers from '../controllers/answersController';

const router = (app) => {
  app.use('/auth', userControllers);
  app.use('/', questionControllers);
  app.use('/', answerControllers);
};

export default router;
