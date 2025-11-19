const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

const fs = require('fs');
const path = require('path');

const todosPath = path.join(__dirname, 'todos.json');
let todos = JSON.parse(fs.readFileSync(todosPath), 'utf-8');

// Home page - list all todos
app.get('/', (req, res) => {
    res.render('index', { todos });
});

// Add task
app.post('/add', (req, res) => {
    const { task } = req.body;
    const newTodo = { id: todos.length + 1, task, completed: false };
    todos.push(newTodo);
    res.redirect('/');
});

// Update task
app.post('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { task } = req.body;
    const todo = todos.find(t => t.id === id);
    if (todo) todo.task = task;
    res.redirect('/');
});

// Delete task
app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.redirect('/');
});

app.listen(5000, () => console.log("Server running on port 5000"));