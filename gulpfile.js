var gulp = require('gulp'),
    less = require('gulp-less'),
    runSequence = require('run-sequence'),
    templateCache = require('gulp-angular-templatecache'),
    htmlmin = require('gulp-htmlmin'),
    jade = require('gulp-jade'),
    path = require('path'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    flatten = require('gulp-flatten'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    ngHtml2Js = require("gulp-ng-html2js"),
    mkdirp = require('mkdirp'),
    clean = require('gulp-clean');


/************************************************/
// Config
/************************************************/
var config = require('./build-config');
var paths = {
    coreLessFiles: [config.srcDir + '/web/less/core/**'],
    lessFiles: [config.srcDir + '/web/less/client/**/*.less'],
    templates: [config.srcDir + '/web/template/**/*.html'],
    views: [config.srcDir + '/web/views/**/*.jade'],
    controllers: [config.srcDir + '/web/js/**/*.js'],
    vendors: [config.srcDir + '/web/vendors/**/*'],
    otherFiles: [config.srcDir + '/index.js', config.srcDir + '/Dockerfile'],
    publicFiles: [config.srcDir + '/web/public/**/*'],
    minifyFiles: ['web/js/**/*.js'],
    publicDir: config.distDir,
    workDir: config.workDir
};
var SRC_VENDOR_JS = config.vendor.js;
var SRC_VENDOR_CSS = config.vendor.css;
var SRC_VENDOR_FONTS = config.vendor.fonts;
var SRC_VIEW_FILES = paths.views;

//dest dirs
var DIST_DIR = config.distDir;
var DIST_PUBLIC_DIR = path.join(DIST_DIR, '');
var DIST_CSS_DIR = path.join(DIST_PUBLIC_DIR, 'css');
var DIST_JS_DIR = path.join(DIST_PUBLIC_DIR, 'js');
var DIST_FONTS_DIR = path.join(DIST_PUBLIC_DIR, 'fonts');
var DIST_FONT_DIR = path.join(DIST_PUBLIC_DIR, 'font');
var DIST_VENDOR_JS_FILE_NAME = 'vendor.js';
var DIST_VENDOR_CSS_FILE_NAME = 'vendor.css';
var DIST_CONTROLLER_FILE_NAME = 'controllers.js';
var DIST_VIEW_TEMPLATE_JS_FILE_NAME = 'view-templates.js';
var DIST_VENDOR_TEMPLATE_JS_FILE_NAME = 'templates.js';
var DIST_FINAL_MIN_JS_FILE_NAME = 'app.min.js';

/************************************************/
//Build Scripts
/************************************************/

gulp.task('build-vendor-js', function() {
    return gulp.src(SRC_VENDOR_JS).pipe(concat(DIST_VENDOR_JS_FILE_NAME))
        // .pipe(uglify())
        .pipe(gulp.dest(DIST_JS_DIR));
});

gulp.task('build-clean', function() {
    return gulp.src(paths.workDir, {
        read: false
    }).pipe(clean({
        force: true
    }));
});
gulp.task('copy-work', function() {
    return gulp.src(paths.coreLessFiles).pipe(gulp.dest(path.join(paths.workDir, 'less')));
});

//vendors
gulp.task('build-vendors', ['copy-vendors', 'build-vendor-js', 'build-vendor-styles', 'build-vendor-fonts', 'build-vendor-font']);

gulp.task('copy-vendors', function() {
    return gulp.src(paths.vendors)
        .pipe(gulp.dest(path.join(paths.publicDir, 'vendors')));
});

gulp.task('build-vendor-js', function() {
    return gulp.src(SRC_VENDOR_JS)
        .pipe(concat(DIST_VENDOR_JS_FILE_NAME))
        //.pipe(uglify())
        .pipe(gulp.dest(DIST_JS_DIR));
});

gulp.task('build-vendor-styles', function() {
    return gulp.src(SRC_VENDOR_CSS).pipe(concat(DIST_VENDOR_CSS_FILE_NAME)).pipe(cssmin()).pipe(gulp.dest(DIST_CSS_DIR));
});

gulp.task('build-vendor-fonts', function() {
    return gulp.src(SRC_VENDOR_FONTS)
        .pipe(flatten())
        .pipe(gulp.dest(DIST_FONTS_DIR));
});
gulp.task('build-vendor-font', function() {
    return gulp.src(SRC_VENDOR_FONTS).pipe(flatten()).pipe(gulp.dest(DIST_FONT_DIR));
});
//styles
gulp.task('prepare-styles', function() {
    return gulp.src(paths.lessFiles)
        .pipe(gulp.dest(path.join(paths.workDir, 'less')));
});
gulp.task('build-styles', function() {
    return gulp.src(path.join(paths.workDir, 'less', 'app.less'))
        .pipe(less({
            paths: [path.join(paths.publicDir)]
        }))
        .pipe(gulp.dest(path.join(paths.publicDir, 'css')));
});
gulp.task('build-styles-minify', function() {
    return gulp.src(path.join(paths.workDir, 'less', 'app.less')).pipe(less({
        paths: [path.join(paths.publicDir)]
    })).pipe(cssmin()).pipe(gulp.dest(path.join(paths.publicDir, 'css')));
});
//templates
gulp.task('build-templates', function() {
    return gulp.src(paths.templates)
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(templateCache({
            module: 'app',
            transformUrl: function(url) {
                return 'template/' + url;
            },
            filename: "templates.js"
        }))
        .pipe(gulp.dest(path.join(paths.publicDir, 'js')));
});
//views
gulp.task('build-views', function() {
    return gulp.src(SRC_VIEW_FILES).pipe(jade()).pipe(htmlmin({
        collapseWhitespace: true
    })).pipe(ngHtml2Js({
        moduleName: "templates",
        prefix: "views/"
    })).pipe(concat(DIST_VIEW_TEMPLATE_JS_FILE_NAME)).pipe(gulp.dest(DIST_JS_DIR));
});

//controllers
gulp.task('build-controllers', function() {
    return gulp.src(paths.controllers).pipe(concat(DIST_CONTROLLER_FILE_NAME)).pipe(gulp.dest(path.join(paths.publicDir, 'js')));
});
gulp.task('copy-public', function() {
    return gulp.src(paths.publicFiles).pipe(gulp.dest(paths.publicDir, {
        overwrite: false
    }));
});
gulp.task('concat-js', function() {
    return gulp.src(
        [path.join(DIST_JS_DIR, DIST_VENDOR_JS_FILE_NAME),
            path.join(DIST_JS_DIR, DIST_CONTROLLER_FILE_NAME),
            path.join(DIST_JS_DIR, DIST_VENDOR_TEMPLATE_JS_FILE_NAME),
            path.join(DIST_JS_DIR, DIST_VIEW_TEMPLATE_JS_FILE_NAME)
        ]).pipe(concat(DIST_FINAL_MIN_JS_FILE_NAME)).pipe(gulp.dest(DIST_DIR));
});
gulp.task('minify', function() {
    return gulp.src([path.join(DIST_DIR, DIST_FINAL_MIN_JS_FILE_NAME)]).pipe(ngAnnotate()).pipe(uglify()).pipe(gulp.dest(DIST_DIR));
});
gulp.task('build', function(cb) {
    runSequence('build-clean', 'copy-work', 'prepare-styles', 'build-templates', 'build-vendors', 'build-styles-minify', 'build-views', 'build-controllers', 'copy-public', 'concat-js', 'minify', cb);
});
gulp.task('build-no-minify', function(cb) {
    runSequence('build-clean', 'copy-work', 'prepare-styles', 'build-templates', 'build-vendors', 'build-styles', 'build-views', 'build-controllers', 'copy-public', 'concat-js', cb);
});
gulp.task('watch', function() {
    gulp.watch(paths.lessFiles, ['prepare-styles', 'build-styles']);
    gulp.watch(paths.templates, function() {
        return runSequence('build-templates', 'concat-js');
    });
    gulp.watch(paths.views, function() {
        return runSequence('build-views', 'concat-js');
    });
    gulp.watch(paths.controllers, function() {
        return runSequence('build-controllers', 'concat-js');
    });
    gulp.watch(paths.publicFiles, ['copy-public']);
});
gulp.task('default', ['build-no-minify', 'watch']);
