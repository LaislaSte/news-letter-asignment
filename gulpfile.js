const webserver = require('gulp-webserver');
const gulp = require('gulp');
const gulpsass = require('gulp-sass')(require('sass'));
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const minhtml = require('gulp-htmlmin');
const babel = require('gulp-babel');
const uglyfy = require('gulp-uglify');

const compileJsFiles = () => {
  return gulp
    .src('src/js/**/*.js')
    .pipe(
      babel({
        comments: false,
        presets: ['ENV'],
      })
    )
    .pipe(uglyfy())
    .on('error', (error) => console.log(error))
    .pipe(concat('build.min.js'))
    .pipe(gulp.dest('app/js/'));
};

const minHTML = () => {
  return gulp
    .src('src/**/*.html')
    .pipe(minhtml({ removeComments: true, html5: true, collapseWhitespace: true }))
    .pipe(gulp.dest('app/'));
};

const changeCSS = () => {
  return gulp
    .src('src/sass/**/*.scss')
    .pipe(gulpsass())
    .pipe(uglifycss())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('app/css'));
};

const moveAssets = () => {
    return gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('app/assets'))
}

const server = () => {
  return gulp.src('app').pipe(
    webserver({
      livereload: true,
    //   directoryListing: true,
      open: true,
      port: 8080,
      fallback: 'index.html',
    })
  );
};

const watchFiles = () => {
  gulp.watch('src/**/*.html', minHTML);
  gulp.watch('src/sass/**/*.scss', changeCSS);
  gulp.watch('src/js/**/*.js', compileJsFiles)
};

exports.default = gulp.series(
  minHTML,
  gulp.parallel(moveAssets, changeCSS),
  compileJsFiles,
  server,
  watchFiles
);
