// dependencies
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// paths
var appName = 'ne-swapi',
    source = ['./src/**/*.js'],
    destination = './dist/';

gulp.task('js', function() {
  gulp.src(source)
  .pipe(concat(appName + '.js'))
  .pipe(gulp.dest(destination))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(rename(appName + '.min.js'))
  .pipe(gulp.dest(destination))
});

gulp.task('default', ['js']);
