const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err, client) => {
  if (err){
   return console.log('Unable to connect');
  }
  console.log('Connected');

  // client.db().collection('Todos').find({completed: false}).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));

  // }, err => {
  //     console.log(err);
  // });



  client.db().collection('Users').find({name: 'Alex'}).toArray().then(name => {
    console.log(JSON.stringify(name,undefined,2))
  }, err => {
    console.log(err);
  });

  //client.close();
});
