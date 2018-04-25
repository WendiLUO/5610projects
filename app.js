var express = require('express')
var mongoose = require('mongoose');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var passport = require('passport');

var userRouter = require("./services/user.service.server.js");
var postRouter = require("./services/post.service.server.js");
var commentRouter = require("./services/comment.service.server.js");
var multer = require('multer');

var app = express()
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/mydb');

app.use(cookieParser());
app.use(session({secret: "secret"}));
app.use(express.static('dist'));

app.set(multer({
    dest: './public/images',
    rename: function(fieldname, filename) {
        return filename;
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  next()

});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', userRouter);
app.use('/', postRouter);
app.use('/', commentRouter);
/*
app.get('/', function(req, res) {
    res.sendFile('src/index.html', {root: __dirname});
})
*/

app.post('/upload', function uploadImage(req, res) {
  // console.log("upload");
  //  var file = req.body;
  //  console.log("file" + file);
  var storage = multer.diskStorage({
    destination: './src/assets/views/images',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  var upload = multer({
    storage: storage
  }).any();

  upload(req, res, function(err) {
    //console.log("req" + req.files.re);
    if (err) {
      console.log(err);
      return res.end('Error');
    } else {
      // console.log("file" + req.body);
      console.log("files" + JSON.stringify(req.files));
      req.files.forEach(function(item) {
        console.log('item filename' + JSON.stringify(item.filename));
        res.send(item.filename);
        // move your file to destination
      });
    }
  });
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
})
