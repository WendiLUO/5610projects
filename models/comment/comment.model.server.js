var Comment = require('./comment.schema.server.js');

exports.createComment = function(postId, comment) {
    comment._post = postId;
    return Comment.create(comment);
}

exports.findAllCommentsForPost = function(postId) {
    return Comment.find({_post: postId});
};

exports.findCommentById = function(commentId) {
    return Comment.findOne({_id: commentId});
};

exports.deleteComment = function(commentId) {
    return Comment.remove({_id: commentId});
};
