import express from 'express';
import db from '../db.js';

const router = express.Router();

//get all todos for a user
router.get('/', (req, res) => {});

//Create new todo
router.post('/', (req, res) => {});

//get specific todo by id
router.get('/:id', (req, res) => {});

//update todo by id
router.put('/:id', (req, res) => {});

//delete todo by id
router.delete('/:id', (req, res) => {});

export default router;
