var gulp = require('gulp'),
    path = require('path'),
    bower = require('gulp-bower');
/************************************************/
// Config
/************************************************/
var config = require('./build-config');
gulp.task('bower', function() {
    return bower(config.bowerDir);
});
