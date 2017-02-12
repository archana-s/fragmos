var copy = require('recursive-copy');
var fs = require('fs')

// Create a directory one level above fragmos
fs.exists('../proj_styleguide', function(exists) {
  if (exists) {
    console.log('Folder exists')
  }
  if (!exists) {
    fs.mkdir('../proj_styleguide', function(data) {
      if (data) {
        console.log(data)
      }
      console.log('Created a new directory to place all your styles and styleguide')
      copy('./src', '../proj_styleguide/src', function(err, results) {
        if (err) {
          throw err;
        }
        console.log('Copied templated styles to your styleguide.')
        fs.createReadStream('package.json').pipe(fs.createWriteStream('../proj_styleguide/package.json'));
        fs.createReadStream('gulpfile.js').pipe(fs.createWriteStream('../proj_styleguide/gulpfile.js'));
        fs.createReadStream('index.js').pipe(fs.createWriteStream('../proj_styleguide/index.js'));
        console.log('Copied all js and json files')

        copy('./public', '../proj_styleguide/public', function(err, data) {
          if (err) throw err;
          console.log('Copied public directory')
        })
      })
    });
  }
})
