var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({
    username:{
      type: String,
      index: { unique: true}
    },
    password: String
    // Profile needed;
});


var User = Mongoose.model('User', UserSchema);

module.exports = User;
