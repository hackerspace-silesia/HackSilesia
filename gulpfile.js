var gulp = require("gulp");
//Global
var concat = require("gulp-concat");
//JS
var jshint = require("gulp-jshint");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
//CSS
var uncss = require('gulp-uncss');
var cssmin = require('gulp-cssmin');

function getPath(type) {
    return "./src/**/*." + type;
}

gulp.task('watch', [], function(){
    gulp.watch(getPath('js'), ['scripts']);
    gulp.watch(getPath('html', ['html']));
    gulp.watch(getPath('less', ['styles']));
});



gulp.task('scripts', ['jshint'], function() {
    gulp.src([getPath('js')])
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./deploy'));
});

gulp.task('jshint', [], function () {
    gulp.src([getPath('js'), '!./src/js/vendor/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['watch', 'scripts']);


// {
//     "gulp-concat": "^2.4.1",
//     "gulp-cssmin": "^0.1.6",
//     "gulp-htmlmin": "^0.2.0",
//     "gulp-jshint": "^1.8.5",
//     "gulp-less": "^1.3.6",
//     "gulp-uncss": "^0.5.0",
//     "jshint-stylish": "^1.0.0"
// }
