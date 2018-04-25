var User = require('./user.schema.server.js');

exports.createUser = function(user) {
    return User.create(user);
}

exports.findUserById = function(userId) {
    return User.findOne({_id: userId});
};

exports.findUserByUsername = function(username) {
    return User.findOne({username: username});
};

exports.findUserByCredentials = function(username, password) {
    return User.findOne({username: username, password: password});
};

exports.updateUser = function(userId, newUser) {
  User.findById(userId, function(err, user){
    console.log(newUser.location);
    user.set({
      username: newUser.username,
      email: newUser.email,
      breed: newUser.breed,
      age: newUser.age,
      location: newUser.location,
      gender: newUser.gender
    });
    return user.save(function (err, newUser){

    })
  })
};

exports.deleteUser = function(userId) {
    return User.remove({_id: userId});
};

