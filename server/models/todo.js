const mongoose = require('mongoose');
const Todo = mongoose.model('Todo',{
  text: {type: String, required: true, minlength: 1},
  completed: {type: Boolean,default: false},
  completedAt: {type: Date, default: null}
});

module.exports = {Todo};