import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log(err.message);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized, Invalid token' });
  }
};

export default authMiddleware;
