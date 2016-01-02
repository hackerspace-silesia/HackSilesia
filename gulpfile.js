var gulp = require('gulp');
//Global
var concat = require('gulp-concat');
//JS
var uglify = require('gulp-uglify');
//CSS
var uncss = require('gulp-uncss');
var cssnano = require('gulp-cssnano');
//HTML
var htmlmin = require('gulp-htmlmin');
var htmlreplace = require('gulp-html-replace');

var webserver = require('gulp-webserver');

var UGLIFY = {
    sequences: true, // join consecutive statemets with the “comma operator”
    properties: true, // optimize property access: a['foo'] → a.foo
    dead_code: true, // discard unreachable code
    drop_debugger: true, // discard “debugger” statements
    unsafe: true, // some unsafe optimizations (see below)
    conditionals: true, // optimize if-s and conditional expressions
    comparisons: true, // optimize comparisons
    evaluate: true, // evaluate constant expressions
    booleans: true, // optimize boolean expressions
    loops: true, // optimize loops
    unused: true, // drop unused variables/functions
    hoist_funs: true, // hoist function declarations
    hoist_vars: true, // hoist variable declarations
    if_return: true, // optimize if-s followed by return/continue
    join_vars: true, // join var declarations
    cascade: true, // try to cascade `right` into `left` in sequences
    side_effects: true, // drop side-effect-free statements
    warnings: true, // warn about potentially dangerous optimizations/code
    global_defs: {} // global definitions
};

var HTMLMIN = {
    removeComments: true,
    removeCommentsFromCDATA: true,
    collapseWhitespace: true,
};

var UNCSS = {
    html: ['./src/index.html'],
    ignore: [
        /active/,
        /collapse/,
        /in/,
        /collapsing/,
    ]
};

var CSS = {
    noAdvanced: true
};

var PATHS = {
  js: 'src/js/**/*.js',
  css: 'src/css/**/*.css',
  html: 'src/index.html',
  img: 'src/img/**.*',
  downloads: 'src/downloads/**.*',
}

gulp.task('copyCname', function() {
  return gulp.src('./CNAME')
      .pipe(gulp.dest('./deploy'));
});

gulp.task('copyImages', function() {
  gulp.src('./src/img/**/*.*')
      .pipe(gulp.dest('./deploy/img'));
});

gulp.task('copyFonts', function() {
  gulp.src('./src/font/**/*.*')
      .pipe(gulp.dest('./deploy/font'));
});

gulp.task('copyDownloads', function() {
  gulp.src('./src/downloads/**/*.*')
      .pipe(gulp.dest('./deploy/downloads'));
})


gulp.task('copy', [
  'copyCname',
  'copyImages',
  'copyFonts',
  'copyDownloads'
]);

gulp.task('watch', function () {
    gulp.watch('./gulpfile.js', ['copy', 'scripts', 'html', 'css']);
    gulp.watch(PATHS.js, ['scripts']);
    gulp.watch(PATHS.html, ['html']);
    gulp.watch(PATHS.css, ['css', 'copy']);
});

gulp.task('css', [], function () {
    gulp.src(PATHS.css)
        .pipe(uncss(UNCSS))
        .pipe(cssnano(CSS))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./deploy/css'));
});

gulp.task('html', function () {
    gulp.src(PATHS.html)
        .pipe(htmlreplace({
          js: 'js/scripts.min.js',
          css: 'css/style.min.css'
        }))
        .pipe(htmlmin(HTMLMIN))
        .pipe(gulp.dest('./deploy'));
});


gulp.task('scripts', function () {
    gulp.src([
      'src/js/vendor/jquery.min.js',
      'src/js/vendor/bootstrap.min.js',
      'src/js/vendor/mdb.js',
      PATHS.js,
      ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify(UGLIFY))
        .pipe(gulp.dest('./deploy/js'));
});

gulp.task('default', ['copy', 'css', 'html', 'scripts']);

gulp.task('webserver', function() {
  gulp.src('./deploy/')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('dev', ['default', 'webserver', 'watch']);
