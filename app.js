var express = require('express')
var mongoose = require('mongoose');
var flash = require('connect-flash');

var userRouter = require("./services/user.service.server.js");
var websiteRouter = require("./services/post.service.server.js");
var pageRouter = require("./services/comment.service.server.js");

var app = express()
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/shakepawDB');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', userRouter);
app.use('/', websiteRouter);
app.use('/', pageRouter);
app.use('/', widgetRouter);
/*
app.get('/', function(req, res) {
    res.sendFile('src/index.html', {root: __dirname});
})
*/
app.use(express.static('dist'));

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
})
