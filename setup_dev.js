const copy = require('recursive-copy')
const rl = require('readline')
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
// Create a directory one level above fragmos
const styleguideExists = fs.existsSync('../proj_styleguide');

if (styleguideExists) {
  console.log('proj_styleguide folder exists. Please rename it and try again.')
}

if (!styleguideExists) {
  const i = rl.createInterface(process.stdin, process.stdout, null)

  // Ask the user for project name and logo location
  i.question("What is the name of your project? ", projectName => {
    i.question("Provide a local full path to your logo file (You can also leave it at default for now): ", logoLocation => {

      // Create the project Styleguide directory
      fs.mkdir('../proj_styleguide', function(data) {
        copy('./src', '../proj_styleguide/src', function(err, results) {
          if (err) {
            throw err;
          }

          // Add package.json and index.js files
          fs.createReadStream('package.json.toCopy').pipe(fs.createWriteStream('../proj_styleguide/package.json'));
          fs.createReadStream('index.js').pipe(fs.createWriteStream('../proj_styleguide/index.js'));

          // Include the project name in gulpfile
          let gulpFileData = fs.readFileSync('gulpfile.js', 'utf-8')
          gulpFileData = gulpFileData.replace('%%project%%', projectName)
          try {
            fs.writeFileSync('../proj_styleguide/gulpfile.js', gulpFileData)
          } catch(err) {
            throw err;
          }

          copy('./public', '../proj_styleguide/public', function(err, data) {
            if (err) throw err;
            if (logoLocation && fs.existsSync(logoLocation)) {
              fs.createReadStream(logoLocation).pipe(fs.createWriteStream('../proj_styleguide/public/images/logo.png'))
            } else {
              console.log('Could not find the logo file at ', logoLocation,  '. Default icon will be included now.')
            }
            console.log('You can now delete this directory. You generated styleguide + all styles are available in proj_styleguide dir')
            i.close()
          })
        })
      })
    })
  })
}
