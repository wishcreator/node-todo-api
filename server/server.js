const express = require('express');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/users');

const app = express();
app.use(express.json());
app.post('/todos',(req,res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) =>{
    res.send(doc);
  }, err => {
    res.status(400).send(e);
  });

});

app.listen(3000,() => {
  console.log('Start');
});