var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

/* GET All Items. */
router.get('/', function (req, res, next) {
    Todo.getTodos(function (error, todos) {
        if (error) {
            throw  error;
        } else {
            res.json(todos);
        }
    })
});
/* GET Single Item. */
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Todo.getTodo(id, function (error, todo) {
        if (error) {
            throw  error;
        } else {
            res.json(todo);
        }
    })
});
/* Add Item. */
router.post('/', function (req, res, next) {
    var todo = req.body;
    Todo.addTodo(todo, function (error, todo) {
        if (error) {
            throw  error;
        } else {
            res.json(todo);
        }
    })
});
/* Update Item. */
router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    var todo = req.body;
    Todo.updateTodo(id, todo, {}, function (error, todo) {
        if (error) {
            throw  error;
        } else {
            res.json(todo);
        }
    })
});
/* Delete Item. */
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    Todo.deleteTodo(id, function (error, todo) {
        if (error) {
            throw  error;
        } else {
            res.json(todo);
        }
    })
});



module.exports = router;
