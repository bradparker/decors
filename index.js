var express = require('express');
var request = require('request');
var url = require('url');
var app = express();

app.use(function(req, res, next) {
  var whitelist = ['localhost'];
  var ref = req.headers.referer;
  var u = url.parse(ref || '');
  if(whitelist.indexOf(u.hostname) !== -1) {
    return next();
  }
  res.status(403).send('Invalid origin');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  console.log('Received request for: ' + req.query.url);
  request(req.query.url).pipe(res);
});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Decors app listening at http://%s:%s', host, port)
})
