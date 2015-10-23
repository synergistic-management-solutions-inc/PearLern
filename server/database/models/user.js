var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({
    username:{
      type: String,
      index: { unique: true}
    },
    password: String,
    profile: {
    	email: String,
    	about: String,
    	interests: String
    }
});


var User = Mongoose.model('User', UserSchema);

module.exports = User;
