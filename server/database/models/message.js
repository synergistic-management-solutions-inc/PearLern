var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var MessageSchema = new Schema({
  to: String,
  from: String,
  text: String,
  created_at: {type: Date}
});

MessageSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

var Message = Mongoose.model('Message', MessageSchema);

module.exports = Message;
