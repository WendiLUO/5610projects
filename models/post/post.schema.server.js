var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('../comment/comment.schema.server.js')
var User = require('../user/user.schema.server.js')

var postSchema = new Schema({
    content: String,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    pic: String,
    thumbUp: Number,
    dateCreated: Date,
    gender: String,
    breed: String
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
