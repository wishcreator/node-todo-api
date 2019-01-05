const express = require('express');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/users');
const {ObjectID} = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.post('/todos',(req,res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) =>{
    res.send(doc);
  }, err => {
    res.status(400).send(err);
  });

});

app.get('/todos', (req,res) => {
  Todo.find().then(todos => {
    res.send({todos});
  }, err =>{
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req,res) => {
  const {id} = req.params;
  if(!ObjectID.isValid(id)) {
   return res.status(404).send('Invalid ID');
  }
  
  Todo.findById(id).then(todo => {
    if(!todo) {
      return res.status(404).send('Nothing found');
    }
    res.status(200).send({todo});

  }, err => {
    res.status(400).send();
  })

});

app.delete('/todos/:id', (req,res) => {
  const {id} = req.params;
  if(!ObjectID.isValid(id)) return res.status(404).send();

  Todo.findByIdAndDelete(id)
  .then(todo => {
    if(!todo) return res.status(404).send();
    res.status(200).send({todo});
  }).catch(e => {
    res.status(400).send();
  });


});


app.listen(port,() => {
  console.log('Start at port '+ port);
});

module.exports = {app};