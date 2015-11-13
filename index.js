var express = require('express');
var juice = require('juice');
var app = express();


var ejs = require('ejs')
  , fs = require('fs')
  , str = fs.readFileSync('views/bar.ejs', 'utf8');

app.set('view engine', 'ejs');



function getJuiced() {
  var ret = ejs.render(fs.readFileSync('views/bar.ejs', 'utf8'), {
    names: ['foo', 'bar', 'baz']
  });

  return juice(ret);
}


app.get('/bar.html', function (req, res) {
  res.send(getJuiced());
});

app.get('/test', function (req, res) {
  res.render("testpage");
});

app.get('/bar.js', function (req, res) {
  var ret = ejs.render(fs.readFileSync('views/bar_javascript.ejs', 'utf8'), {
    html: escape(getJuiced())
  });

  res.contentType('text/javascript');
  res.send(ret);
});

var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
