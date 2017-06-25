const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var app = require('./../../server').app;

const {users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);

// it('should return hello world response', (done)=>{
//   // done is for async testing.. test waits for done to be called
//   request(app)
//     .get('/')
//     .expect(200)// status code
//     .end(done);
// });

describe('GET /users/me', ()=>{
  it ('should return user if authenticated', (done)=>{
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
  it ('should return a 401 if not authenticated', (done)=>{
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res)=>{
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});
