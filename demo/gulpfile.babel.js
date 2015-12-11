import gulp from 'gulp';
import sass from 'gulp-sass-native';
import babel_ from 'gulp-babel';
import browserify from 'gulp-browserify';
import template from 'component-template';

// Standard babel factory
var babel = () => { return babel_({
    presets: ['es2015']
  });
};

// Everything
gulp.task('default', ['styles', 'scripts']);

// Compile styles
gulp.task('styles', function() {
  return gulp.src('./src/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build'));
});

// Compile scripts and components
gulp.task('scripts-build', function() {
  gulp.src('./src/*.js').pipe(babel()).pipe(gulp.dest('./tmp'));
  gulp.src(template.scripts()).pipe(babel()).pipe(gulp.dest('./tmp/component-template'));
});

// Combine scripts
gulp.task('scripts', ['scripts-build'], function() {
  return gulp.src('./tmp/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('./build'));
});
