//this code expects Mongo to be installed
//and a db called 'pairLearning' to exist

var mongoose = require('mongoose');

var mongodb;
//Once we deploy this will become relevant

var config = {
  mongoUrl: process.env.MONGOLAB_URI || 'mongodb://localhost/pairLearning'
  //this url may or may not be incorrect
};

mongoose.connect(config.mongoUrl);

mongoose.connection.on('error', function(err){
 console.log('Mango problem', err);
});

module.exports = mongoose;
