
var mongoose = require('mongoose');

var mongodb;
//Once we deploy this will become relevant

var config = {
  mongoUrl: mongodb || 'mongodb://localhost/'
  //need to configure this local url
};

mongoose.connect(config.mongoUrl);

mongoose.connection.on('error', function(err) {
  console.log('Error with Mango connection:', err);
  mongoose.connect(config.mongoUrl);
});

module.exports = mongoose;
