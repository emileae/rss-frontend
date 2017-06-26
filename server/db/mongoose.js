var mongoose = require('mongoose');
mongoose.Promise = global.Promise;// tell mongoose that we're using promises not callbacks... only do thins once here

//'mongodb://localhost:27017/RSS' // 'mongodb://mongo:27017/RSS'
mongoose.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});
console.log(".... SETUP MONGODB - CONNECT ....");

module.exports = {mongoose};
