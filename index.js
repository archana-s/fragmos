var express = require('express')
var app = express()
var path = require('path')

app.get('/demo', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/demo.html'))
})

app.get('/styleguide', function (req, res) {
  res.sendFile(path.join(__dirname, '/styleguide/index.html'))
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.use('/public', express.static(path.join(__dirname, '/public')))
