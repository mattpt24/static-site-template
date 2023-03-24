// GULP 
const gulp = require('gulp');
const {
  src,
  dest,
  watch,
  series
} = require('gulp');

// SASS COMPILER
const sass = require('gulp-sass')(require('sass'));

// CSS MINIFER
const cleanCSS = require('gulp-clean-css');

// AUTOPREFIXER
const autoprefixer = require('gulp-autoprefixer');

// BABEL
const babel = require('gulp-babel');

// CONCAT COMBINE JS FILES
var concat = require('gulp-concat');


function combineJS() {
  return gulp.src('./build/js/*.js')
    .pipe(concat('combined.js'))
    .pipe(gulp.dest('./dist/js'));
};



// SASS COMPILER // CSS MINIFIER // AUTO PREFIXER
function buildStyles() {
  return gulp.src('build/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('./dist/css'));
  }



  // BABEL
  function javascript() {
    return src('./build/js/*.js')
      .pipe(babel({
        presets: ['@babel/env'],
      }))
      .pipe(concat('all.js'))
      .pipe(dest('./dist/js'));
  }



  // LIVE WATCH
  function watchCSS() {
    watch('./build/**/*.scss', buildStyles);
    watch('./build/js/*.js', javascript);
  }


exports.buildStyles = series(buildStyles);
exports.watchCSS = series(watchCSS);
exports.javascript = series(javascript);
exports.combineJS = series(combineJS);



exports.default = series(buildStyles, watchCSS, javascript, combineJS);