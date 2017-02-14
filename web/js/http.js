app

//==============================================
// Auth Interceptor
//==============================================

    .config(function($httpProvider) {
    $httpProvider.interceptors.push('apiInterceptor');
})

.service('apiInterceptor', ['$rootScope', 'sessionService', '$location', function($rootScope, sessionService, $location) {
    this.request = function(config) {
        if (!$rootScope.$storage.currentUser) {
            $location.path('/dashboard');
        }
        if (config.headers.Authorization) {} else if (angular.isDefined($rootScope.$storage.token)) {
            config.headers.Authorization = 'Token ' + $rootScope.$storage.token
        }
        if (angular.isDefined($rootScope.$storage.companyID)) {
            config.headers.companyID = $rootScope.$storage.companyID
        }
        if (config.headers.NoHeader)
            config.headers = {};

        return config;
    };

    this.responseError = function(response) {
        return response;
    };
}])
