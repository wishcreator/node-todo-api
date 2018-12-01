const mongoose = require('mongoose');
const Todo = mongoose.model('Todo',{
  text: {type: String},
  completed: {type: Boolean,default: false},
  completedAt: {type: Date, default: null}
});

module.exports = {Todo};