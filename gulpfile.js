var gulp = require('gulp');
//Global
var concat = require('gulp-concat');
//JS
var uglify = require('gulp-uglify');
//CSS
var uncss = require('gulp-uncss');
var cssnano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var cssNext = require('postcss-cssnext');
var nested = require('postcss-nested');
//HTML
var htmlmin = require('gulp-htmlmin');
var htmlreplace = require('gulp-html-replace');
//Images
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); // $ npm i -D imagemin-pngquant

// templates
var nunjucks = require('gulp-nunjucks');

var CONFIG = require('./TEMPLATES_CONFIG.js');

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
  html: ['./deploy/index.html'],
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
  templates: 'src/templates/**/*.html',
  img: 'src/img/**.*',
  downloads: 'src/downloads/**.*',
  fonts: 'src/fonts/**.*',
}

gulp.task('copyCname', function() {
  return gulp.src('./CNAME')
    .pipe(gulp.dest('./deploy'));
});

gulp.task('copyFonts', function() {
  return gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('./deploy/fonts'));
});

gulp.task('copyDownloads', function() {
  return gulp.src('./src/downloads/**/*.*')
    .pipe(gulp.dest('./deploy/downloads'));
})


gulp.task('copy', [
  'copyCname',
  'copyFonts',
  'copyDownloads'
]);

gulp.task('watch', ['copy', 'cssdev', 'html', 'scripts', 'images'], function() {
  gulp.watch(PATHS.js, ['scripts']);
  gulp.watch([PATHS.html, PATHS.templates], ['html']);
  gulp.watch(PATHS.css, ['cssdev']);
  gulp.watch(PATHS.downloads, ['copyDownloads']);
  gulp.watch(PATHS.fonts, ['copyFonts']);
  gulp.watch(PATHS.img, ['images']);
});

gulp.task('css', ['html'], function() {
  gulp.src(PATHS.css)
    .pipe(uncss(UNCSS))
    .pipe(postcss([nested, cssNext]))
    .pipe(cssnano(CSS))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./deploy/css'));
});

gulp.task('cssdev', function() {
  gulp.src(PATHS.css)
    .pipe(postcss([nested, cssNext]))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./deploy/css'));
});

gulp.task('html', function() {
  gulp.src(PATHS.html)
    .pipe(htmlreplace({
      js: 'js/scripts.min.js',
      css: 'css/style.min.css'
    }))
    .pipe(nunjucks.compile(CONFIG))
    .pipe(htmlmin(HTMLMIN))
    .pipe(gulp.dest('./deploy'));
});


gulp.task('scripts', function() {
  gulp.src([
      'src/js/vendor/jquery.min.js',
      'src/js/vendor/mini-bootstrap.min.js',
      'src/js/smooth-scroll.js',
      PATHS.js,
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify(UGLIFY))
    .pipe(gulp.dest('./deploy/js'));
});

gulp.task('images', function() {
  return gulp.src('./src/img/**/*.*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('deploy/img'));
});


gulp.task('default', ['copy', 'css', 'html', 'scripts', 'images']);

if (process.env.NODE_ENV === 'dev') {
  var webserver = require('gulp-webserver');
  gulp.task('webserver', function() {
    gulp.src('./deploy/')
      .pipe(webserver({
        livereload: true,
        directoryListing: false,
        open: false
      }));
  });

  gulp.task('dev', ['webserver', 'watch']);
}
