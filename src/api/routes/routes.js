import userControllers from '../controllers/ask_user_controller';


const routeMiddleware = (app) => {
  app.use('/auth', userControllers);
};

export default routeMiddleware;
