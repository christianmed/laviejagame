'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const pref = require('gulp-autoprefixer');
const brow = require('browser-sync').create();
const rlad = brow.reload;

gulp.task('pug', () => {
  return gulp.src('./dev/index.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', () => {
  return gulp.src('./dev/styles.scss')
    .pipe(sass({ outputStyle: 'nested' }).on('error', sass.logError))
    .pipe(pref({ browsers: 'last 10 versions', cascade: true }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(rlad({ stream: true }));
});

gulp.task('js', () => {
  return gulp.src('./dev/app.js')
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watcher', ['pug', 'styles', 'js'], () => {
  gulp.watch('./dev/index.pug', ['pug']);
  gulp.watch('./dev/styles.scss', ['styles']);
  gulp.watch('./dev/app.js', ['js']);
  gulp.watch('./dist/js/app.js').on('change', rlad);
  gulp.watch('./dist/index.html').on('change', rlad);
});

gulp.task('default', ['watcher'], () => {
  brow.init({ server: './dist/' });
});