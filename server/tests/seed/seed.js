const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');

const {User} = require('./../../models/user');

// 1st user is valid
// 2d user is invalid
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'e@e.com',
    password: '1234561',
    tokens:[{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, 'secretpasswordTurbulentFlux').toString()// use the same secret as was used in user.js for jwt signing
    }]
  },
  {
    _id: userTwoId,
    email: 'e2@e.com',
    password: '1234562'
  }
];

const populateUsers = (done) => {
  User.remove({}).then(()=>{
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    //
    return Promise.all([userOne, userTwo]);
    //Promise.all waits for all promises to resolve
  }).then(()=>done());
}

module.exports = {users, populateUsers};
