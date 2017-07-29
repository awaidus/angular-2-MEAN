var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    name: String,
    created: {type: Date, default: Date.now()}
});

var Todo = module.exports = mongoose.model('Todo', todoSchema);

module.exports.getTodos = function (callback, limit) {
    Todo.find(callback).limit(limit);
};
module.exports.getTodo = function (id, callback) {
    Todo.findById(id, callback);
};
module.exports.addTodo = function (todo, callback) {
    Todo.create(todo, callback);
};
module.exports.updateTodo = function (id, todo, options, callback) {
    Todo.findOneAndUpdate(id, todo, options, callback);
};
module.exports.deleteTodo = function (id, callback) {
    Todo.remove(id, callback);
};