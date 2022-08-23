const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const webp = require('gulp-webp');
const htmlmin = require('gulp-htmlmin');
const tiny = require('gulp-tiny');
const gulpCopy = require('gulp-copy');
const fileinclude = require('gulp-file-include');
const version = require('gulp-version-number');
const svgmin = require('gulp-svgmin');

function htmlModify() {
  return gulp
    .src('./*.html')
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(
      version({
        value: '%TS%',
        append: {
          key: 'v',
          to: ['css', 'js'],
        },
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build/'));
}
gulp.task('htmlminify', htmlModify);

function copyFile() {
  return gulp.src('./*.{png,jpg,jpeg}').pipe(gulpCopy('build/'));
}
gulp.task('copyfile', copyFile);

function copyFakeApi() {
  return gulp
    .src('./fake-api.json', { allowEmpty: true })
    .pipe(gulpCopy('build/'));
}
gulp.task('copyfakeapi', copyFakeApi);

function tinyPng() {
  return gulp
    .src('./img/*.{png,jpg,jpeg}')
    .pipe(
      tiny({
        apiKey: ['5dJy9lQRSff7TtmRcD037qJy7v7yQFk5'],
        cache: true,
        log: false,
      })
    )
    .pipe(gulp.dest('build/img/'));
}
gulp.task('tinypng', tinyPng);

function webpimg() {
  return gulp
    .src(['./img/*.{jpg,png,tiff}'])
    .pipe(webp({ quality: 95 }))
    .pipe(gulp.dest('img/'))
    .pipe(gulp.dest('build/img/'))
    .pipe(browserSync.stream());
}
gulp.task('webpconverter', webpimg);

function minifySvg() {
  return gulp.src(['./img/*.svg']).pipe(svgmin()).pipe(gulp.dest('build/img/'));
}
gulp.task('minifysvg', minifySvg);

function compilaSass() {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 3 versions'],
        cascade: false,
      })
    )
    .pipe(gulp.dest('css/'))
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());
}
gulp.task('sass', compilaSass);

function gulpJS() {
  return gulp
    .src('./js/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'))
    .pipe(browserSync.stream());
}
gulp.task('mainjs', gulpJS);

function pluginJS() {
  return gulp
    .src('./lib/**/*.js')
    .pipe(gulp.dest('build/libs/'))
    .pipe(browserSync.stream());
}
function pluginCSS() {
  return gulp
    .src('./lib/**/*.css')
    .pipe(gulp.dest('css/lib/'))
    .pipe(gulp.dest('build/css/lib/'))
    .pipe(browserSync.stream());
}
gulp.task('pluginjs', pluginJS);
gulp.task('plugincss', pluginCSS);

function browser() {
  browserSync.init({
    server: {
      baseDir: './build',
    },
  });
}
gulp.task('browser-sync', browser);

function watch() {
  gulp.watch('./scss/**/*.scss', compilaSass);
  gulp.watch('./scss/**/*.scss', htmlModify);
  gulp.watch('./js/**/*.js', gulpJS);
  gulp.watch('lib/**/*.js', pluginJS);
  gulp.watch('lib/**/*.css', pluginCSS);
  gulp.watch('./js/**/*.js', htmlModify);
  gulp.watch('./*.html', htmlModify);
  gulp.watch('./fake-api.json', copyFakeApi);
  gulp.watch('./img/*.{svg}', minifySvg);
  gulp.watch('./img/*.{jpg,png,tiff}', webpimg);
  gulp.watch('./img/*.{jpg,png,tiff}', tinyPng);
  gulp.watch('./*.{jpg,png,tiff}', copyFile);
  gulp.watch(['*.html']).on('change', browserSync.reload);
}

gulp.task('watch', watch);

gulp.task(
  'default',
  gulp.parallel(
    'webpconverter',
    'minifysvg',
    'copyfile',
    'htmlminify',
    'copyfakeapi',
    'tinypng',
    'watch',
    'browser-sync',
    'sass',
    'mainjs',
    'pluginjs',
    'plugincss'
  )
);
gulp.task(
  'build',
  gulp.parallel(
    'webpconverter',
    'minifysvg',
    'copyfile',
    'htmlminify',
    'copyfakeapi',
    'tinypng',
    'sass',
    'mainjs',
    'pluginjs',
    'plugincss'
  )
);
