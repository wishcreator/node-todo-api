const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
  {_id: new ObjectID(), text: 'First test'},
  {_id: new ObjectID(), text: 'second test'}
]

beforeEach(done => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos',() => {
  it('shoulc create a new todo', (done) => {
    const text = 'Test Test Test';

    request(app).post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err,res) => {
      if(err){
        return done(err);
      }

      Todo.find({text}).then(todos => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch(e => {
        done(e);
      })
    });
  });

  it('should not create todo with invalid body data', done => {
    request(app).post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }
      
      Todo.find().then(todos => {
        expect(todos.length).toBe(2);
        done();
      }).catch(e => done(e))

    });
  });
});

describe('Get /todos', () => {
  it('should get all todos', done => {
    request(app).get('/todos')
    .expect(200)
    .expect(res => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  }); 
});

describe('GET /todos/:id', () => {
  it('should return to do doc', (done) => {
    request(app).get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect(res => {
      expect(res.body.todo.text).toBe(todos[0].text);
    }).end(done);
  });

  it('should return 404 if todo not found', done => {
    request(app).get(`/todos/5c2fcdade301a63ac0aa7972`)
    .expect(404).end(done);
  });

  it('should return 404 for non object ids', done => {
    request(app).get(`/todos/123`)
    .expect(404).end(done);
  });

});
describe('delete /Todos', () =>{
  const hexId = todos[0]._id.toHexString();
  it('Should remove todo',done => {
    request(app).delete(`/todos/${hexId}`)
    .expect(200)
    .expect(res => {
      console.log(res.body);
      expect(res.body.todo._id).toBe(hexId);
    }).end((err, res) => {
      if(err) return done(err);

      Todo.findById(hexId).then(todo => {
        expect(todo).toNotExist();
        done();
      }).catch(e => {
        done(e);
      });
    });
  });

  it('should return 404 if todo not found', done => {
    request(app).delete(`/todos/5c2fcdade301a63ac0aa7972`)
    .expect(404).end(done);
  });

  it('should return 404 for non object ids', done => {
    request(app).delete(`/todos/123`)
    .expect(404).end(done);
  });

});