
var mongoose = require('mongoose');

var mongodb = process.env.PROD_MONGODB || process.env.MONGOLAB_URI;

var config = {
  mongoUrl: mongodb || 'mongodb://localhost/shortly'
};

mongoose.connect(config.mongoUrl);

mongoose.connection.on('error', function(err) {
  console.log('Error with Mango connection:', err);
  mongoose.connect(config.mongoUrl);
});

module.exports = mongoose;