app.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$location', 'authService', '$window', loginCtrl]);

function loginCtrl($rootScope, $scope, $http, $location, authService, $window) {
    $rootScope.locationPath = $location.$$path;
    $scope.credentials = {
        'userName': '',
        'password': ''
    };

    if ($rootScope.$storage.currentUser) {
        $window.location.href = '/#/dashboard';
    }

    $scope.doLogin = function() {
        authService.login($scope.credentials).then(function(res) {
            if (res.data.status === 'success') {
                $location.path('/dashboard');
                $rootScope.$broadcast('SELECTED_TAB', 'dashboard');
            } else {
                $scope.message = "Invalid Credentials";
            }
        });
    }
}
