var Post = require('./post.schema.server.js');

exports.createPost = function(userId, post) {
    post._user = userId;
    return Post.create(post);
}

exports.findAllPostsForUser = function(userId) {
    return Post.find({_user: userId});
};

exports.findPostById = function(postId) {
    return Post.findOne({_id: postId});
};

exports.deletePost = function(postId) {
    return Post.remove({_id: postId};)
};
