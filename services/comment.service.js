var express = require('express');
var router = express.Router();
var commentModel = require('./../model/comment/comment.model.server.js');

router.post('/api/post/:postId/comment', function (req, res, next) {
    commentModel.createComment(req.params.postId, req.body)
        .then(function(comment) {
        res.json(comment);
    });
});
router.get('/api/post/:postId/comment', function (req, res, next) {
    commentModel.findAllCommentsForPost(req.params.postId)
        .then(function(comments) {
        res.json(comments);
    });
});
router.get('/api/comment/:commentId', function (req, res, next) {
    commentModel.findCommentById(req.params.commentId)
        .then(function(comment) {
        res.json(comment);
    });
});

router.delete('/api/comment/:commentId', function (req, res, next) {
    commentModel.deleteComment(req.params.commentId)
        .then(function(comment) {
        res.json(comment);
    });
});

module.exports = router;
