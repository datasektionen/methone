var express = require('express');
var juice = require('juice');
var request = require('request');
var UglifyJS = require("uglify-js");
var url = require('url');
var bodyParser = require('body-parser');
var app = express();


var ejs = require('ejs')
  , fs = require('fs');

app.set('view engine', 'ejs');
app.use(bodyParser.json());

var cached_js_file = null;
var cached_term_file = null;

function inline_template(file) {
  return juice(ejs.render(fs.readFileSync(file, 'utf8'))).replace(/"/g, '\\"').replace(/[\n\s]+/g, " ");
}

/**
  Fetch the fuzzyfiles from all the specified providers.
*/
function construct_master_fuzz(callback) {
  var file = JSON.parse(fs.readFileSync('providers.json', 'utf8'));
  var num = file.providers.length;
  var fuzzes = [];

  for (var provider of file.providers) {
    if("divider" in provider) {
      num--;
      continue;
    }
    request.get(provider.fuzzy_file, {timeout: 2500}, function(err, resp, body) {
      num--;
      try {
        if (resp.statusCode == 200) {
            fuzzes.push(JSON.parse(body).fuzzes);
        }
      } catch (e) {
        console.error("Failed to fetch: " + e);
      } finally {
        if (num <= 0) {
          // Add the master file aswell
          fuzzes.push(JSON.parse(fs.readFileSync('Fuzzyfile.master', 'utf8')).fuzzes);
          callback({fuzzes:[].concat.apply([], fuzzes)});
        }
      }
    });
  }
}

app.get('/bar.html', function (req, res) {
  res.send(inline_template('views/bar.ejs'));
});

app.get('/test', function (req, res) {
  res.render("testpage");
});

app.get('/Fuzzyfile', function (req, res) {
  res.send(fs.readFileSync('Fuzzyfile.master', 'utf8'));
});

app.get('/bar.js', function (req, res) {
  res.redirect('/');
});


app.get('/', function (req, res) {

  if (cached_js_file == null || process.env.DEV_MODE) {

    construct_master_fuzz(function(master_fuzzyfile) {
      cached_js_file = ejs.render(fs.readFileSync('views/bar_javascript.ejs', 'utf8'), {
        html: inline_template('views/bar.ejs'),
        master_fuzzyfile: JSON.stringify(master_fuzzyfile),
        providers: fs.readFileSync('providers.json', 'utf8'),
        listitem_template: inline_template('views/listitem.ejs'),
        menuitem_template: inline_template('views/menuitem.ejs'),
        startmenuitem_template: inline_template('views/start_menu_item.ejs'),
        startmenudivider_template: inline_template('views/start_menu_divider.ejs')
      });

      cached_js_file = UglifyJS.minify(cached_js_file, {fromString: true}).code;
      res.contentType('text/javascript');
      res.send(cached_js_file);
    });
  } else {

    res.contentType('text/javascript');
    res.send(cached_js_file);
  }
});

app.get('/term.js', function (req, res) {
  if (cached_term_file == null || process.env.DEV_MODE) {
    cached_term_file = ejs.render(fs.readFileSync('views/terminal_javascript.ejs', 'utf8'), {});

    cached_term_file = UglifyJS.minify(cached_term_file, {fromString: true}).code;
  }

  res.contentType('text/javascript');
  res.send(cached_term_file);
});

app.post('/rpc', function(req,res) {
  try {
    var rpc = req.body;
    console.log(rpc)

    if (!("jsonrpc" in rpc)) {
      res.status(400).send("No jsonrpc version specified");
      return;
    }

    var response = {
      jsonrpc: "2.0",
      id: rpc.id,
      result: ""
    };

    switch (rpc.method) {
      case "flush":
        cached_js_file = null;
        cached_term_file = null;
        response.result = {
          success: true,
          message: "Flushed caches"
        };
        break;
      default:
        delete response.result;
        response.error = {code: -32601, message: "Method not found"};

    }

    res.send(response);



  } finally {

  }
});

app.get('/cache/u-dun-goofed', function (req, res) {
  cached_js_file = null;
  res.redirect('/test');
});

var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
