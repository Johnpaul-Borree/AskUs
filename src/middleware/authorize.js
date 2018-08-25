import jwt from 'jsonwebtoken';

const authorizeToken = (router) => {
  router.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ status: 'failed', message: 'Access Denied NO token found' });

    try {
      const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
      req.body.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token sent', err: 'Session expired' });
    }
  });
};

export default authorizeToken;
