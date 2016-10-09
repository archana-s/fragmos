var gulp = require('gulp')
var postcss = require('gulp-postcss')

/* Build styleguide */
gulp.task('build:styleguide', function () {
    var concat = require('gulp-concat')
    var postcss = require('gulp-postcss')
    var autoprefixer = require('autoprefixer')
    var customProperties = require('postcss-custom-properties')
    var Import = require('postcss-import')
    var styleGuide = require('postcss-style-guide')
    var extend = require('postcss-extend')
    var nano = require('cssnano')

    return gulp.src('./styles/app.css')
        .pipe(postcss([
            Import,
            extend,
            customProperties({ preserve: true }),
            autoprefixer,
            styleGuide({
                project: 'Styleguide',
                dest: 'styleguide/index.html',
                showCode: false,
                themePath: './node_modules/psg-theme-default/'
            }),
            nano
        ]))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/styles'))
})

gulp.task('default', function() {
  gulp.watch('styles/*.css', ['build:styleguide'])
})
