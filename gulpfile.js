"use strict";

let gulp = require('gulp');
let source = require('vinyl-source-stream'); // Used to stream bundle for further handling
let browserify = require('browserify');
let serve = require('gulp-serve');

gulp.task('app', function() {
    return browserify('./app/main.jsx')
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./build/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(['./app/**/*.jsx'], ['app']);
});

gulp.task('serve', serve(['public', 'build']));

gulp.task('default', ['app', 'serve']);