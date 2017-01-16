
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, './')));

app.get('/*', function(req, res, next) {
  res.status(200).sendFile(path.join(__dirname+'/index.html')); 
});

app.listen(process.env.PORT || 7777, function () {
  console.log('LOCAL PORT:', process.env.PORT || 7777);
});
