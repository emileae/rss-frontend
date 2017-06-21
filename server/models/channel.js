const mongoose = require('mongoose');
const validator = require('validator');

// channel
var ChannelSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isURL,
      message: '{VALUE} is not a valid url.'
    }
  },
  title: {
    type: String,
    trim: true
  }
});

ChannelSchema.methods.updateTitle = function(title){
  var channel = this;
  console.log("saving channel title.... ");
  channel.title = title;
  channel.save();// not returned so as not to interfere with subsequent operations
};

var Channel = mongoose.model('Channel', ChannelSchema);

module.exports = {
  Channel
};
