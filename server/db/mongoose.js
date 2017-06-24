var mongoose = require('mongoose');
console.log(".... SETUP MONGODB ....");
mongoose.Promise = global.Promise;// tell mongoose that we're using promises not callbacks... only do thins once here
mongoose.connect('mongodb://localhost:27017/RSS', function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});
console.log(".... SETUP MONGODB - CONNECT ....");

module.exports = {mongoose};
