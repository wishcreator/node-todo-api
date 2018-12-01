// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
  if (err){
   return console.log('Unable to connect');
  }
  console.log('Connected');

  // client.db().collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //     if(err) { 
  //       return console.log('bad', err);
  //     }
  //     console.log(JSON.stringify(result.ops,undefined,2));
  // });

//   const db = client.db();
// db.collection('Users').insertOne({
//   name:'Alex',
//   age: 25,
//   location: 'TLV  '
// },(err, result) => {
//   if(err){
//     return console.log('All fail');
//   }
//   console.log(JSON.stringify(result.ops,undefined,2));
// });

  client.close();
});
