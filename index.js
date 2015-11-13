var express = require('express');
var juice = require('juice');
var UglifyJS = require("uglify-js");
var app = express();


var ejs = require('ejs')
  , fs = require('fs')
  , str = fs.readFileSync('views/bar.ejs', 'utf8');

app.set('view engine', 'ejs');

var cached_js_file = null;

function getJuiced() {
  var ret = ejs.render(fs.readFileSync('views/bar.ejs', 'utf8'));

  return juice(ret);
}

function inline_template(file) {
  return escape(juice(ejs.render(fs.readFileSync(file, 'utf8'))))
}

app.get('/bar.html', function (req, res) {
  res.send(getJuiced());
});

app.get('/test', function (req, res) {
  res.render("testpage");
});

app.get('/Fuzzyfile', function (req, res) {
  res.send(fs.readFileSync('Fuzzyfile.sample', 'utf8'));
});

app.get('/bar.js', function (req, res) {

  if (cached_js_file == null || process.env.DEV_MODE == "true") {
    cached_js_file = ejs.render(fs.readFileSync('views/bar_javascript.ejs', 'utf8'), {
      html: inline_template('views/bar.ejs'),
      master_fuzzyfile: fs.readFileSync('Fuzzyfile.master', 'utf8'),
      listitem_template: inline_template('views/listitem.ejs'),
      menuitem_template: inline_template('views/menuitem.ejs')
    });

    if (process.env.DEV_MODE != "true")
      cached_js_file = UglifyJS.minify(cached_js_file, {fromString: true}).code;
  }

  res.contentType('text/javascript');
  res.send(cached_js_file);
});

var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
