import jwt from 'jsonwebtoken';

function authorizeToken(req, res, next) {
  const token = req.headers('x-auth-token');
  if (!token) return res.status(401).json({ status: 'failed', message: 'Access Denied NO token found' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '1hr' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token sent');
  }
}

export default authorizeToken;
