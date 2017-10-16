var fs = require('fs')
var path = require('path')

var assets = require('./build/asset-manifest.json')

fs.copyFileSync(path.join(__dirname, 'build', assets['main.js']), path.join(__dirname, 'build/bar.js'))
fs.copyFileSync(path.join(__dirname, 'build', assets['main.js.map']), path.join(__dirname, 'build/bar.js.map'))
