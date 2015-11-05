var Mongoose = require('mongoose');
var bcrypt = require('bcrypt');
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
      location: String,
      website: String,
      joined: String,
      github: String,
      lenguages: []
    }
});

//hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var User = Mongoose.model('User', UserSchema);

module.exports = User;
