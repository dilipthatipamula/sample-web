var app = angular.module('app', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'templates',
    'nya.bootstrap.select',
    'angular-loading-bar',
    'ui-notification',
    'ui.bootstrap.datetimepicker'
])

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}])
