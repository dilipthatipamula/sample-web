app
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");


        $stateProvider

        //------------------------------
        // HOME
        //------------------------------

            .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/list.html',
            controller: 'dashboardCtrl'
        })

    })
