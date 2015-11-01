var Mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({
    username:{
      type: String,
      index: { unique: true}
    },
    password: String,
    profile: {
    	name: String,
    	about: String,
    	interests: []
    }
});
//hash
//
// UserSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
// };

// UserSchema.methods.validPassword = function(password) {
//   return bcyrpt.compareSync(password, this.password);
// };

var User = Mongoose.model('User', UserSchema);

module.exports = User;
