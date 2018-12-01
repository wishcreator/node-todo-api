const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err, client) => {
  if (err){
   return console.log('Unable to connect');
  }
  console.log('Connected');
  const db = client.db();

  db.collection('Todos').deleteMany({});

  //client.close();
});
