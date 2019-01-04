const {mongose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/users');

const id = '5c02a016d435263e68aedb9b'; 


User.findById(id).
then(user => {
  if(!user) {
   return console.log('User Not found');
  }
  console.log(user);
}).catch(e => {
  console.log('Invalid Id');
})



// if(!ObjectID.isValid(id)) {

// }

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log(todos);
// });

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log(todo);
// });



