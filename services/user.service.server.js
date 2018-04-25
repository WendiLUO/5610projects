var express = require('express');
var router = express.Router();
var userModel = require('./../models/user/user.model.server.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

const saltRounds = 10;
passport.use(new LocalStrategy(localStrategy));

function localStrategy(username, password, done) {
    userModel.findUserByUsername(username)
    .then(function(user) {
        if (user && user.username === username && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
function deserializeUser(user, done) {
    userModel.findUserById(user._id)
    .then(
        function(user) {
            done(null, user);
        },
        function(err) {
            done(err, null);
        }
    );
}
function serializeUser(user, done) {
    done(null, user);
}

router.post('/api/login', passport.authenticate('local'), login);
function login(req, res) {
    var user = req.user;
    console.log(41);
    console.log(user);
    res.json(user);
}
router.post('/api/user', function(req, res, next) {
    userModel.createUser(req.body, function(err, id) {
        console.log("id" + id);
        res.send(id);
    });
});
router.post('/api/logout', logout);

function logout(req, res) {
    req.logOut();
    res.send(200);
}

router.post('/api/register', register);
function register(req, res) {
    var user = req.body;
    var salt = bcrypt.genSaltSync(saltRounds);
    user.password = bcrypt.hashSync(user.password, salt);
    userModel.createUser(user)
    .then(function(user) {
        if (user) {
            req.login(user, function(err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    console.log("register successfully")
                    res.json(user);
                }
            });
        }
    });
}
router.get('/api/loggedin', loggedin);
function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

router.get('/api/user', function(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if (password == null) {
        userModel.findUserByUsername(req.query.username, function(err, user) {
            res.json(user);
        });
    } else {
        userModel.findUserByCredentials(req.query.username, req.query.password, function(err, user) {
            res.json(user);
        });
    }

});
router.get('/api/user/:userId', function(req, res) {
    userModel.findUserById(req.params.userId)
        .then(function(user) {
        res.json(user);
    });
});

router.put('/api/user/:userId', function(req, res) {
    // console.log(req.params.userId, req.body);
    userModel.updateUser(req.params.userId, req.body)
    res.send(req.body);
});
router.delete('/api/user/:userId', function(req, res) {
    userModel.deleteUser(req.params.userId)
        .then(function(user) {
        res.json(user);
    });
});
module.exports = router;
