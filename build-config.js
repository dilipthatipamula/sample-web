var RUN_MODE = 'docker';
/************************************************/
// Directory Paths
/************************************************/
var PATHS = {
    docker: {
        bowerDir: '/app/public/vendors/bower_components',
        vendorJS: '/src/web/vendors/**/*.js',
        distDir: '/app/public',
        runMode: 'docker',
        workDir: '/tmp/work',
        srcDir: '/src'
    },
    gulp: {
        bowerDir: 'output/public/vendors/bower_components',
        vendorJS: 'web/vendors/**/*.js',
        distDir: 'output/public/',
        runMode: 'gulp',
        workDir: 'output/work',
        appDir: '.',
        srcDir: '.'
    }
};

var config = PATHS[RUN_MODE];
// console.log('config paths:', config)
/************************************************/
// Vendor configuration
/************************************************/
// js: List of vendor js files to be included. All these will be merged to ${DIST_DIR}/public/js/vendor.js
// css: List of vendor css files to be included. All these will be merged to ${DIST_DIR}/public/css/vendor.css
// fonts: List of vendor font files to be included. All these will be copied to ${DIST_DIR}/public/fonts/
config.vendor = {
    js: [
        PATHS[RUN_MODE].bowerDir + '/jquery/dist/jquery.min.js',
        PATHS[RUN_MODE].bowerDir + '/bootstrap/dist/js/bootstrap.min.js',
        PATHS[RUN_MODE].bowerDir + '/angular/angular.min.js',
        PATHS[RUN_MODE].bowerDir + '/angular-animate/angular-animate.min.js',
        PATHS[RUN_MODE].bowerDir + '/angular-resource/angular-resource.min.js',
        PATHS[RUN_MODE].bowerDir + '/angular-ui-router/release/angular-ui-router.min.js',
        PATHS[RUN_MODE].bowerDir + '/angular-bootstrap/ui-bootstrap-tpls.min.js',
        PATHS[RUN_MODE].bowerDir + '/underscore/underscore-min.js',
        PATHS[RUN_MODE].bowerDir + '/ngstorage/ngStorage.min.js',
        PATHS[RUN_MODE].bowerDir + '/nya-bootstrap-select/dist/js/nya-bs-select.min.js',
        PATHS[RUN_MODE].bowerDir + '/lodash/dist/lodash.min.js',
        PATHS[RUN_MODE].bowerDir + '/sweetalert/dist/sweetalert.js',
        PATHS[RUN_MODE].bowerDir + '/bootstrap-sweetalert/lib/sweet-alert.min.js',
        PATHS[RUN_MODE].bowerDir + '/angular-loading-bar/build/loading-bar.min.js',
        PATHS[RUN_MODE].bowerDir + '/tinymce/tinymce.min.js',
        PATHS[RUN_MODE].bowerDir + '/angular-ui-notification/dist/angular-ui-notification.min.js',
        PATHS[RUN_MODE].bowerDir + '/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js',
        PATHS[RUN_MODE].bowerDir + '/highcharts/highcharts.js',
        PATHS[RUN_MODE].vendorJS
    ],
    css: [
        PATHS[RUN_MODE].bowerDir + '/material-design-iconic-font/dist/css/material-design-iconic-font.min.css',
        PATHS[RUN_MODE].bowerDir + '/animate.css/animate.min.css',
        PATHS[RUN_MODE].bowerDir + '/font-awesome/css/font-awesome.min.css',
        PATHS[RUN_MODE].bowerDir + '/nya-bootstrap-select/dist/css/nya-bs-select.min.css',
        PATHS[RUN_MODE].bowerDir + '/sweetalert/dist/sweetalert.css',
        PATHS[RUN_MODE].bowerDir + '/bootstrap-sweetalert/lib/sweet-alert.css',
        PATHS[RUN_MODE].bowerDir + '/angular-loading-bar/build/loading-bar.min.css',
        PATHS[RUN_MODE].bowerDir + '/angular-ui-notification/dist/angular-ui-notification.min.css',
    ],
    fonts: [
        PATHS[RUN_MODE].bowerDir + '/material-design-iconic-font/dist/font/*',
        PATHS[RUN_MODE].bowerDir + '/font-awesome/fonts/*',
        PATHS[RUN_MODE].bowerDir + '/bootstrap/dist/fonts/*',
    ]
};
module.exports = config;
