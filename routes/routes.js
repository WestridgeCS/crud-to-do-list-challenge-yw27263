import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// Read All ToDos
router.get('/', async(req,res,next) =>{
  try {
    const text = ( req.query.text || '').trim();
    const done = ( req.query.done || '');

    const filter = {};
    if (done==="true") filter.done = true;
    if (done==="false") filter.done = false;

    const todos = await Todo.find(filter);

    res.render('index', {
      todos,
      title: "To Do List",
      query: {text, done}
    })

  } catch (err) {
    next(err);
  }
});

// Create a ToDo
router.post('/create', async (req, res, next) => {
  try {
    const { text, done } = req.body;

    await Todo.create({ text, done:false });

    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

// Toggle Done
router.post('/:id/toggle', async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.redirect('/');

    todo.done = !todo.done;
    await todo.save();

    res.redirect('/');
  } catch (err) {
    next(err)
  }
});

// Edit
router.post('/:id/edit', async (req, res,next) =>{
  try {
    const {text} = req.body;

    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      {text},
      {new: true, runValidators: true}
    );

    if (!updated) return res.status(404).send("To Do not upadted");

    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

// Delete
router.post('/:id/delete', async (req,res,next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.redirect('/');

  } catch (err) {
    next(err)
  }

})

export default router;