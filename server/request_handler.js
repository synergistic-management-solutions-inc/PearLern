exports.signUp = function(req, res) {
  var user = {};
  user.username = req.body.username;
  user.password = req.body.password;

  //actually create user
  //grab ID from our friend the DB

  //testing code, delete later
  user.id = 1;

  res.status(201).send(user);
}

exports.signIn = function(req, res) {
  var user = {};
  user.username = req.body.username;
  user.password = req.body.password;

  //verify user exists/correct password

  //testing code, delete later
  user.id = 1;

  res.status(200).send(user);
}