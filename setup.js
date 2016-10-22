var copy = require('recursive-copy');

// This is saved inside node_modules. Pull this out on to the project directory.
copy('./styles', '../../', function(error, results) {
  if (error) {
    console.error('Copy failed: ' + error);
  } else {
    console.info('Copied ' + results.length + ' files');
  }
});
