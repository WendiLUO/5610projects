var express = require('express');
var router = express.Router();
var postModel = require('./../models/post/post.model.server.js');


router.post('/api/post/:userId', function(req, res, next) {
    var post = req.body;
    console.log('post js file');
    // post._user = req.params.userId;
    postModel.createPost(post, req.params.userId)
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
router.get('/api/post', function(req, res, next) {
  console.log('findallpost server js');
    postModel.findAllPost()
        .then(function(posts) {
        res.json(posts);
    })
})
router.get('/api/breed/:breed/gender/:gender', function(req, res, next) {
    postModel.findPostsByBreed_Gender(req.params.breed, req.params.gender)
        .then(function(posts) {
       res.json(posts);
    });
})
router.put('/api/post/thumbup/:postId', function(req, res, next) {
  console.log('updatePostThumbUp js');
    postModel.updatePostInThumbUp(req.params.postId);
  res.send(req.body);

  //     .then(function(post) {
    //       console.log(post);
    //     res.json(post);
    // })
})
module.exports = router;
