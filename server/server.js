const express = require('express');
const bodyParser = require('body-parser');
// const FeedParser = require('feedparser');
// const request = require('request');
const _ = require('lodash');
const normalizeUrl = require('normalize-url');

var {mongoose} = require('./db/mongoose');
var {Channel} = require('./models/channel');
var {Feed} = require('./models/feed');
var {User} = require('./models/user');
var {UserChannel} = require('./models/userChannel');
var {authenticate} = require('./middleware/authenticate.js');
var {startUpdateFeeds} = require('./utils/cronJobs');
var {SaveFeed} = require('./utils/saveFeed');
var validator = require('validator');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

// confirmUserOwnership
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Start cron jobs to update feeds
// startUpdateFeeds();

app.get('/', (req, res) => {
  console.log("hello");
});

// ==============================
// USERS
// ==============================
// User Registration
// authentication based on user email and password
// password is hashed and salted using bcryptjs node module
// TODO: store the jwt secret password as an environment variable
// x-auth header is set to the JSON web token generated using the jwt node module, secret password stored serverside
app.post('/users', (req, res) => {
  // TODO might be a hidden bug here, verify_password isn't part of the user model,
  // but it will try to set it and fail because, there is no verify_password field in User model
  var user = new User(_.pick(req.body, ['email', 'password', 'name', 'surname']));
  // quick double check for password verification
  if (user.password === req.body.verify_password){
    user.save().then(() => {
      return user.generateAuthToken();// returns another promise
    }).then((token) => {
      var registerResponse = {
        "user": user,
        "token": token
      };
      res.header('x-auth', token).send(registerResponse);
    }).catch( (err) => {
      console.log("User registration err: ", err);
      if (err.code === 11000){
        console.log("duplication error");
        var response = {
          action: "notification",
          message: "That user already exists, try another email."
        };
        res.status(400).send(response);
      }else{
        var response = {
          action: "notification",
          message: err
        };
        res.status(400).send(response);
      }
    });
  }else{
    var response = {
      action: "notification",
      message: "Passwords don't match."
    };
    res.status(200).send(response);
  };

});

// user home
// Authenticated route to get basic user information
// authenticate middleware in authenticate.js
// checks the x-auth token is valid and belongs to a user
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// Login
// uses the static model method findByCredentials to check that the email exists in the DB
// and that the bcrypt hashed password matches the corresponding user
// a new login token is then set to the x-auth header, with a 200 response
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      // TODO: change this to not include the token in the response
      // can instead host everything on the same domain, then get token from the header
      // no need to expose the header
      var loginResponse = {
        "user": user,
        "token": token
      };
      res.header('x-auth', token).send(loginResponse);
    });
  }).catch((e) => {
    console.log("login error: ", e);
    res.status(400).send();
  });

});

// Logout
//the Model instance method removeToken is called
// user.removeToken removes the token form the corresponding user's token array in the DB,
// so that subsequent calls with the old x-auth header will no longer be valid
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  }, ()=> {
    res.status(400).send();
  });
});

// ==============================
// RSS CHANNELS
// ==============================

// Adds a new channel to the DB
// only an authenticated user can add a new channel
app.post('/channels', authenticate, (req, res) => {
  var body = _.pick(req.body, ['url']);
  body.user = req.user;
  // use the Normalize library to get some kind of uniform URL
  // TODO: check this normalization to amke sure its fairly standard
  body.url = normalizeUrl(body.url);

  // TODO:
  // check if channel is already in DB
  // if so then check that user doesnt own the channel
  // if user doesnt own the channel then add it to the user's channels


  Channel.findOne({
    url: body.url
  }).then((channelExists)=>{
    // Channel exists see if user already own the cahnnel
    if (channelExists !== null){
      console.log("This channel exists...........");
      UserChannel.findOne({
        _channel: channelExists._id,
        _user: body.user._id
      }).then((userChannelExists)=>{

        if (userChannelExists !== null){
          console.log("User already owns this channel");
            var response = Object.assign({}, userChannelExists, {
            action: "notification",
            message: "Channel already saved."
          });
          res.status(200).send(response);
        }else{
          console.log("User doesnt own this channel");
          // start a chained Promise
          var userChannel = new UserChannel({
            _channel: channelExists._id,
            _user: body.user._id
          });

          // // TODO: make extra sure this isn't duplicated, a user shouldnt have more than one reference to a channel
          // // duplication may be taken care of since a channel can be uploaded at most once
          userChannel.save().then(()=>{
              console.log("Created new userChannel");
              // dont need to save feeds here since the feeds will already be saved and polling
              var response = Object.assign({}, userChannel, {
                action: "notification",
                message: "Channel saved."
              });
              res.status(200).send(response);
          });// this should call the second then
        };

      })
    }

    // channel doesn't exist, so create it
    else{
      // Check if URL is a valid URL (may not be a valid RSS url though)
      if (validator.isURL(body.url)){

        var channel = new Channel(body);
        channel.save().then(() => {
          console.log("Channel tentatively saved");
          // success, return the saved channel back to user
          return SaveFeed(channel).then(()=> {
            console.log("................ resolved saveFeed.....", body);

            // start a chained Promise
            var userChannel = new UserChannel({
              _channel: channel._id,
              _user: body.user._id
            });

            // // TODO: make extra sure this isn't duplicated, a user shouldnt have more than one reference to a channel
            // // duplication may be taken care of since a channel can be uploaded at most once
            return userChannel.save().then((resolveMsg)=>{
              console.log(",.,,.,.,.,.,. ", resolveMsg);
              var response = Object.assign({}, userChannel, {
                action: "notification",
                message: "Channel saved."
              });
              res.status(200).send(response);
            });

          }).catch((err)=>{
            console.log("Error saving the C-H-A-N-N-E-L", err);
            var response = {
              action: "notification",
              message: err
            };
            res.status(200).send(response);
          });
        }).catch((err)=>{
          console.log("/./././././././. error saving the channel: ", err);
          var response = Object.assign({}, userChannel, {
            action: "notification",
            message: "Unable to save Channel"
          });
          res.status(200).send(response);
        });

      }else{
        var response = {
          action: "notification",
          message: "Not a valid RSS URL"
        };
        res.status(200).send(response);
      }// end validator if statement

    }
  }).catch( (err) => {

    console.log("____________ error finding the channel: ", err);

    // something went wrong saving to the DB
    var response = Object.assign({}, err, {
      action: "notification",
      message: "Something went wrong."
    });
    res.status(400).send(response);
  });

});

app.patch('/channels/:channelId', authenticate, (req, res) => {
  // if a channel has been added and has no feeds, then it can be edited
  // if an existing channel has feeds, then other users may be referencing this channel and its child feeds,
  // so can't edit it directly, only the currently logged in user's access to the channel
  var body = _.pick(req.body, ['url']);

  UserChannel.confirmUserOwnership(req)
  .then((userChannel)=>{
    // if there's at least one feed item, then can't edit the feed, just remove and delete
    return Feed.findOne({
      _channel: userChannel._channel
    });
  }).then((feedItem)=>{
    if (feedItem !== null){
      res.status(200).send("There are feeds here, can't edit");
      // delete this userChannel from DB
      // create a new channel and userChannel with the new url, if its valid
    }else{
      res.status(200).send("No feeds here, can change the url");
    }
  }).catch((e)=>{
    res.status(400).send("Unable to edit a channel: ", e);
  });
});

app.delete('/channels/:channelId', authenticate, (req, res) => {
  UserChannel.confirmUserOwnership(req)
  .then((userChannel)=>{
    UserChannel.findByIdAndRemove(userChannel._id).then((userChannel)=>{
      var response = Object.assign({}, userChannel, {
        action: "notification",
        message: "Channel removed."
      });
      res.status(200).send(response);
    });
  }).catch((e)=>{
    res.status(400).send("Unable to remove channel: ", e);
  });
})

// ==============================
// User's RSS CHANNELS / FEEDS
// ==============================

// get a list of channels owned by user
app.get('/users/channels', authenticate, (req, res) => {
  UserChannel.find({
    _user: req.user._id
  }).then((userChannels)=>{

    var returnChannelId = (item) => {
      return item._channel;
    }

    var channelIds = userChannels.map(returnChannelId);

    console.log("channelIds: ", channelIds);

    Channel.find({
        '_id': { $in: channelIds}
    }).then((channels) => {
      console.log("Foudn channels..........", channels);
      res.status(200).send(channels);
    });

    // res.status(200).send(channels);
  }).catch((e)=>{
    res.status(400).send("Couldn't find user's channels: ", e);
  });
});

// get a list of feeds from a channel owned by a user
app.get('/channels/:channelId', authenticate, (req, res) => {
  // var channelId = req.params.channelId;
  // first check that channel belongs to user
  UserChannel.confirmUserOwnership(req)
  // find feeds that match the channel
  .then((userChannel)=>{
    return Feed.find({
      _channel: userChannel._channel
    }).limit(20);
  }).then((feedItems)=>{
      res.status(200).send(feedItems);
  }).catch((e)=>{
    res.status(400).send("Couldn't locate feeds for channel ", e);
  });
});

// run the app... TODO: make this ready for production
app.listen(3000, () => {
  console.log("Started on port 3000");
});
