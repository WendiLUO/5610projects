var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Post = require('../post/post.schema.server.js')

var commentSchema = new Schema({
    content: string,
    _post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateCreated: Date
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
