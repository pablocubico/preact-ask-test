
var fs = require('fs')
var path = require('path')
var express = require('express')
var compress = require('compression')
var rollup = require('rollup')
var babel = require('rollup-plugin-babel')
var nodeResolve = require('rollup-plugin-node-resolve')
var uglify = require('rollup-plugin-uglify')

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

function buildWidget(props) {
  var props = {
    form: {
      saveDestination: 'http://coralasks.theguardian.com/ask/44',
      page: {
        id: 1,
        name: 'first_page',
        children: [
          {
            type: 'Rating',
            content: "Help us document every police killing in America",
            props: {
              steps: 5
            }
          },
          {
            type: 'TextArea',
            content: "The US government has no comprehensive record of the number of people killed by law enforcement...",
            props: {
              maxLength: 100
            }
          },
          {
            type: 'Audio',
            content: "Help us document every police killing in America",
            props: {
              steps: 5
            }
          },
        ]
      }
    }
  };
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
