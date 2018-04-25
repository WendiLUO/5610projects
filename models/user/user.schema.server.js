var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Post = require('../post/post.schema.server.js')

var userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    phone: String,
    breed: String,
    size: Number,
    age: Number,
    gender: String,
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    dateCreated: Date,
    location: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
