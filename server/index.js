
var express = require('express')
var compress = require('compression')
var rollup = require('rollup')
var babel = require('rollup-plugin-babel')
var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')


var app = express()
app.use(compress())

app.get('/preview.js', function(req, res){
  rollup.rollup({
    entry: 'main.js',
    plugins: [babel(), nodeResolve({jsnext: true, main: true})  ],
  }).then(function(bundle){
    var result = bundle.generate({
      format: 'iife'
    })
    res.send(result.code)
  }).catch(function(error){res.status(500).send(error.stack)})
})

app.listen(4444)
