const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err, client) => {
  if (err){
   return console.log('Unable to connect');
  }
  console.log('Connected');
  const db = client.db();

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5c0196016c83ca3a642f4bd3")
  },{
    $set: {
      name: 'Alex'
    },
    $inc: {
      age: 1
    }
  },{returnOriginal: false}).
  then(result => {console.log(result)});
  

  //client.close();
});
