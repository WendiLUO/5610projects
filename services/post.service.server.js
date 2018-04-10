var express = require('express');
var router = express.Router();
var postModel = require('./../model/post/post.model.server.js');


router.post('/api/post', function(req, res, next) {
    postModel.createPost(req.body)
        .then(function(post) {
        res.json(post);
    });
});

router.get('/api/user/:userId/post', function (req, res, next) {
    postModel.findAllPostsForUser(req.params.userId)
        .then(function(posts) {
        res.json(posts);
    });
});

router.get('/api/post/:postId', function(req, res, next) {
    postModel.findPostById(req.params.postId)
        .then(function(post) {
        res.json(post);
    });
});

router.put('/api/post/:postId', function(req, res, next) {
    postModel.updatePost(req.params.postId, req.body)
        .then(function(post) {
        res.json(post);
    })
});
router.delete('/api/post/:postId', function(req, res, next) {
    postModel.deletePost(req.params.postId)
        .then(function(post){
        res.json(post);
    });
});
module.exports = router;
