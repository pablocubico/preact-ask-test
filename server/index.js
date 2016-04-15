var fs = require('fs')
var path = require('path')
var express = require('express')
var compress = require('compression')
var rollup = require('rollup')
var babel = require('rollup-plugin-babel')
var nodeResolve = require('rollup-plugin-node-resolve')
var uglify = require('rollup-plugin-uglify')

var SampleFormProps = require('../src/SampleForm');

var app = express()
app.use(compress())
app.use('/widgets', express.static('widgets'))

app.get('/preview.js', function(req, res){
  buildWidget()
  .then(function(code){
    res.send(code)
  })
  .catch(function(err){ res.status(500).send(err.stack) })
})

app.post('/create', function(req, res){
  buildWidget().then(function(code){
    fs.writeFile(path.join(__dirname, 'widgets', '1234.js'), code, function(err){
      res.send('ok')
    })
  })
  .catch(function(err){ res.status(500).send(err.stack) })
})

app.listen(4444)

function buildWidget() {
  var props = SampleFormProps;
  return new Promise(function(resolve, reject){
    rollup.rollup({
      entry: 'main.js',
      plugins: [babel(), nodeResolve({jsnext: true, main: true}), uglify({mangle: true})],
    }).then(function(bundle){
      var result = bundle.generate({
        intro: 'var props = ' + JSON.stringify(props) + ';',
        format: 'iife'
      })
      resolve(result.code)
    }).catch(reject)
  })
}
