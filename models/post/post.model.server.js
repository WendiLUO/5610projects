var Post = require('./post.schema.server.js');

exports.createPost = function(post, userId) {
    post._user = userId;
    post.thumbUp = 0;
    post.comments = [];
    return Post.create(post);
}

exports.findAllPostsForUser = function(userId) {
    return Post.find({_user: userId});
};

exports.findPostById = function(postId) {
    return Post.findOne({_id: postId});
};

exports.deletePost = function(postId) {
    return Post.remove({_id: postId});
};

exports.findAllPost = function() {
    return Post.find({});
}

exports.findPostsByBreed_Gender = function(breed, gender) {
    return Post.find({breed: breed, gender: gender});
};

exports.updatePostInThumbUp = function(postId) {
    Post.update({_id:postId}, {$inc: {thumbUp: 1}}).then(
      function() {
        console.log('update');
        return Post.findOne({_id: postId});
      }
    );
}
