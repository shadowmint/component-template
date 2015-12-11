import run from 'run-sequence';
import nodeunit from 'gulp-nodeunit';
import sass from 'gulp-sass-native';
import babel from 'gulp-babel';
import gulp from 'gulp';

/// Explicitly run items in order
gulp.task('default', (callback) => {
  run('styles', 'scripts', 'tests', callback);
});

/// Run tests
gulp.task('tests', () => {
  return gulp.src('./build/**/*.tests.js').pipe(nodeunit());
});

// Compile ES6 scripts using bable
gulp.task('scripts', () => {
  return gulp.src('./src/scripts/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./build'));
});

// Compile sass into css
gulp.task('styles', () => {
  return gulp.src('./src/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build'));
});
