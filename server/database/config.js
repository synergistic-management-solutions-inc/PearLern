
var mongoose = require('mongoose');

var mongodb;
//Once we deploy this will become relevant

var config = {
  mongoUrl: mongodb || 'mongodb://localhost/pairLearning'
  //this url may or may not be incorrect
};

mongoose.connect(config.mongoUrl);

mongoose.connection.on('error', function(err){
	console.log('Mango problem', err)
})

module.exports = mongoose;