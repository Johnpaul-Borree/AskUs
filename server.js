import { express } from 'express';

import { routes } from './api/routes/questions';

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export default app;
