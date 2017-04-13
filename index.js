const { createReadStream } = require('fs')
const { join } = require('path')
const express = require('express')
const app = express()
const relative = path => join(__dirname, path)

console.info('Hello and welcome to Fragmos v1.0!')

app.use('/public', express.static(relative('./public')))
app.use('/src', express.static(relative('./src')))

app.get('/demo', (req, res) => {
  createReadStream(relative('./public/demo.html')).pipe(res)
})

const serveStyleGuide = (req, res) => {
  createReadStream(relative('./public/styleguide.html')).pipe(res)
};

app.get('/styleguide', serveStyleGuide)
app.get('/', serveStyleGuide)

app.listen(4500, () => {
  console.log('Now listening on http://localhost:4500\n')
})
