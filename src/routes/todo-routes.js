import express from 'express';
import {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo-controller.js';

const router = express.Router();

//get all todos for a user
router.get('/', getAllTodos);

//Create new todo
router.post('/', createTodo);

//get specific todo by id
router.get('/:id', getTodo);

//update todo by id
router.put('/:id', updateTodo);

//delete todo by id
router.delete('/:id', deleteTodo);

export default router;
