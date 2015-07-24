var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

gulp.task('serve', ['sass'], function() {
  browserSync.init({
      server: './'
  });

  gulp.watch('assets/sass/*.scss', ['sass']);
  gulp.watch('assets/js/*.js', ['js', browserSync.reload]);
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
  gulp.src('assets/sass/*.scss')
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  gulp.src('assets/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'));
});

gulp.task('default', ['serve', 'sass', 'js']);
