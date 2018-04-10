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

exports.updateUser = function(userId, user) {
    return User.update({_id: userId}, user);
};

exports.deleteUser = function(userId) {
    return User.remove({_id: userId});
};
