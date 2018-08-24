import userControllers from '../controllers/ask_user_controller';
import questionControllers from '../controllers/ask_questions_controller';

const routeMiddleware = (app) => {
  app.use('/auth', userControllers);
  app.use('/', questionControllers);
};

export default routeMiddleware;
