app
// =========================================================================
// Base controller for common functions
// =========================================================================
    .controller('mainCtrl', function($rootScope, $localStorage, $location) {
    $rootScope.$storage = $localStorage;
    $rootScope.format = "MM/dd/yyyy";
})

// =========================================================================
// Header
// =========================================================================
.controller('sidebarCtrl', function() {})

// =========================================================================
// Header
// =========================================================================
.controller('headerCtrl', function($scope, authService, $location, $rootScope) {
    $scope.doLogout = function() {
        authService.logout();
        $location.path('/login');
    }

    $scope.tabs = [{
        "name": "Dashboard",
        "url": "dashboard"
    }, {
        "name": "Trades",
        "url": "trades"
    }, {
        "name": "Schedules",
        "url": "schedules"
    }, {
        "name": "Templates",
        "url": "templates"
    }]

    $scope.onClickTab = function(sTab) {
        if (sTab == undefined) {
            var sTab='dashboard';
        }
        _.each($scope.tabs, function(tab) {
            tab.active = false
            if (tab.url === sTab) {
                tab.active = true
            }
        })
    };
    $scope.$on('SELECTED_TAB', function(event, data) {
        $scope.onClickTab(data);
    })
    $scope.setCurrentTab = function() {
        $scope.onClickTab($scope.getURL())
    }
    $scope.getURL = function() {
        return $location.path().split("/")[1]
    }
    $scope.setCurrentTab()
})
