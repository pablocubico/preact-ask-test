
var rollup = require('rollup')
var babel = require('rollup-plugin-babel')
var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
rollup.rollup({
  entry: 'main.js',
  plugins: [babel(), nodeResolve({jsnext: true, main: true}), commonjs()],
}).then(function(bundle){
  var result = bundle.generate({
    format: 'iife'
  })
  console.log(result.code)
}).catch(function(){console.log(arguments)})

