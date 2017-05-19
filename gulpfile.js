"use strict";

let gulp = require('gulp');
let source = require('vinyl-source-stream'); // Used to stream bundle for further handling
let browserify = require('browserify');
let serve = require('gulp-serve');

gulp.task('build', function() {
    return browserify('./src/main.jsx')
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./build/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(['./src/**/*.jsx'], ['build']);
});

gulp.task('serve', serve({
  root: ['public', 'build'],
  hostname: '0.0.0.0',
  port: process.env.PORT || 5000
}));


gulp.task('default', ['build']);
