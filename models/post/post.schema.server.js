var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('../comment/comment.schema.server.js')
var User = require('../user/user.schema.server.js')

var postSchema = new Schema({
    content: string,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateCreated: Date
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
