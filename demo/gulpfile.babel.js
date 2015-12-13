import gulp from 'gulp';
import sass from 'gulp-sass-native';
import babel_ from 'gulp-babel';
import browserify from 'gulp-browserify';
import browserSync from 'browser-sync';
import template from 'component-template';

// Debug mode~
// Don't over write this in normal mode.
template.scripts = () => { return `${__dirname}/../src/scripts/**/*.js`; }
template.styles = (path) => { var fs = require('fs'); fs.writeFileSync(path, `@import '${__dirname}/../src/styles/manifest';`); };

// Standard babel factory
var babel = () => { return babel_({
    presets: ['es2015']
  });
};

// Everything
gulp.task('default', ['styles', 'scripts']);

// Compile styles
gulp.task('styles', function() {
  template.styles('./src/imports/template.scss');
  return gulp.src('./src/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build'));
});

// Compile scripts and components
gulp.task('scripts-build', function() {
  gulp.src(template.scripts()).pipe(babel()).pipe(gulp.dest('./tmp/component-template'));
  return gulp.src('./src/*.js').pipe(babel()).pipe(gulp.dest('./tmp'));
});

// Combine scripts
gulp.task('scripts', ['scripts-build'], function() {
  return gulp.src('./tmp/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('./build'));
});

// Reload on changes
// see https://github.com/BrowserSync/recipes/tree/master/recipes/gulp.task.sequence
gulp.task('reload', ['styles', 'scripts'], browserSync.reload);

// Watch task
gulp.task('watch', function() {
  browserSync({ server: { baseDir: __dirname } });
  gulp.watch(['../src/**/*.scss', 'src/**/*.scss'], ['reload']);
  gulp.watch(['../src/**/*.js', 'src/**/*.js'], ['reload']);
});
