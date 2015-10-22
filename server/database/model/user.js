var Mongoose = require('moongoose');
var Schema = Mongoose.schema;

var UserSchema = new Schema({
    username:{
      type: String,
      index: { unique: true}
    },
    password: String,
    id: ObjectId#auto(true)
    // Profile needed;
});


var User = Mongoose.model('User', UserSchema);

module.exports = User;
