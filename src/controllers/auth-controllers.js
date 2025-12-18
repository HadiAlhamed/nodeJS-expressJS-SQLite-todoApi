import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const query = `
        INSERT INTO users (username , password) VALUES (?, ?)
      `;
    const insertedUser = db.prepare(query);
    const userResult = insertedUser.run(username, hashedPassword);

    //create a default todo for the new user
    const defaultTodo = `Hello, Add your first todo!`;
    const todoQuery = `
        INSERT INTO todos (user_id , task) VALUES (?, ?)
        `;
    const insertedTodo = db.prepare(todoQuery);
    insertedTodo.run(userResult.lastInsertRowid, defaultTodo);

    //generate JWT token
    const token = await jwt.sign(
      {
        userId: userResult.lastInsertRowid,
        username: username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(StatusCodes.CREATED).json({ token });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

const login = (req, res) => {};

export { register, login };
