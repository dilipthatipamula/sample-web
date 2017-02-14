app

// =========================================================================
// Session Service
// =========================================================================

.service('sessionService', ['pageService', function(pageService) {
    this.create = function(data) {
        this.id = 100
        this.user = data.userInfo
        this.privileges = data.privileges
    };
    this.destroy = function() {
        this.id = null
        this.user = null
        this.privileges = null
    };
}])

// =========================================================================
//   Table Schema Service
//   =========================================================================

  .factory('schemaService', ['$http', function($http) {
      return {
          get: function(resource) {
              var myfields = schemaDefs[resource].fields;
              var retValue = _.pick(schemaDefs[resource], "idField");
              retValue.fields = myfields || []
              return retValue;
          }
      };
  }])


// =========================================================================
// Authenticate Service
// =========================================================================

.factory('authService', function($rootScope, $http, sessionService, pageService) {
    var authService = {};

    authService.login = function(credentials) {
        return $http({
                url: 'api/auth/myaccount/login',
                headers: makeHeaders(credentials),
                method: 'POST'
            })
            .success(function(data, status, headers, config) {
                if (data.status === 'success') {
                    sessionService.create(data)
                    $rootScope.$storage.companyID = data.companyID
                    $rootScope.$storage.token = data.token
                    $rootScope.$storage.currentUser = data
                }
            });

        function makeHeaders(credentials) {
            var base64Credentials = window.btoa(credentials.userName + ':' + credentials.password);
            var headers = new Object();
            headers.Authorization = 'Basic ' + base64Credentials;
            return headers;
        }
    };

    authService.logout = function() {
        sessionService.destroy()
        delete $rootScope.$storage.companyID
        delete $rootScope.$storage.token
        delete $rootScope.$storage.currentUser
        delete $rootScope.$storage.notifList
        delete $rootScope.$storage.notifCount
        delete $rootScope.$storage.selectedTab
        delete $rootScope.$storage.onClick
        $rootScope.$storage.pages = pageService.pages([])
    };

    authService.isAuthenticated = function() {
        return !!sessionService.user;
    };

    authService.isAuthorized = function(authorizedRoles) {
        //TODO: Complete this
        return true
    };

    return authService;
})

.factory('pageService', function(pageConfig) {
    var pageService = {}
    pageService.pages = function(privs) {
        return compute(privs)

        function compute(privs) {
            userPages = []
            pageConfig.pages.forEach(function(page) {
                if (page.priv === 'ALL') {
                    if (page.submenu) {
                        userPages.push(computeSubmenu(page, privs, userPages))
                    } else {
                        userPages.push(page)
                    }
                } else {
                    (privs || []).forEach(function(priv) {
                        if (priv.type === 'MODULE_ACCESS' && priv.name === page.priv) {
                            if (page.submenu) {
                                userPages.push(computeSubmenu(page, privs, userPages))
                            } else {
                                userPages.push(page)
                            }
                        }
                    })
                }
            })
            return userPages
        }

        function computeSubmenu(page, privs, userPages) {
            var newPage = angular.copy(page);
            var userSubmenu = [];
            (newPage.submenu || []).forEach(function(submenu) {
                (privs || []).forEach(function(priv) {
                    if (priv.type === 'MODULE_ACCESS' && priv.name === submenu.priv) {
                        userSubmenu.push(submenu)
                    }
                })
            })
            newPage.submenu = userSubmenu;
            return newPage;
        }

    };

    return pageService;

})

//
// .factory('configService', function($http, $rootScope) {
//     var configService = {};
//     configService.init = function() {
//         return $http({
//                 url: '/config',
//                 method: 'GET'
//             })
//             .success(function(data, status, headers, config) {
//                 $rootScope.config = data;
//             });
//     }
//     return configService;
// })
//
// .service('exists', function() {
//     var exists = {};
//     exists.method = function(array, obj) {
//         var isvalueExists = false;
//         _.each(array.rows, function(ch) {
//             if (ch.title == obj) {
//                 isvalueExists = true;
//                 return;
//             } else if (ch.code == obj) {
//                 isvalueExists = true;
//                 return;
//             }
//         });
//         return isvalueExists;
//     }
//     return exists;
// });
