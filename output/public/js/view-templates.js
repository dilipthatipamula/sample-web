(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/dashboard/list.html',
    '<nav class="navbar"><div class="container-fluid p-r-15 p-l-15 p-t-15"><h4 class="m-t-0 m-l-10">Dashboard</h4><div class="row m-t-10"><col-md-12><div class="panel panel-default"><div class="panel-body"><div id="container-1" style="min-width: 310px; height: 400px; margin: 0 auto"></div></div></div></col-md-12></div></div></nav>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/login/login.html',
    '<nav class="navbar navbar-lower"><div class="container-fluid"><div class="row m-t-30"><h5 ng-if="logout" class="text-center">You have been successfully Logged Out!</h5><h4 ng-show="message" class="text-center text-danger">{{message}}</h4></div><div class="row"><div class="col-sm-6 col-md-4 col-md-offset-4 login col-xs-12 col-sm-offset-3"><form role="form" name="loginForm" novalidate="" class="form-horizontal"><div class="form-group"><div class="img"><h3 class="text-center">SIGN IN</h3></div></div><div class="form-group"><div class="row"><div class="col-md-10 col-xs-10 col-md-offset-1 col-xs-offset-1"><div class="input-group input-group-lg"><span id="sizing-addon1" class="input-group-addon"><i class="fa fa-envelope"></i></span><input type="text" placeholder="Username" ng-model="credentials.userName" class="form-control"></div></div></div></div><div class="form-group"><div class="row"><div class="col-md-10 col-xs-10 col-md-offset-1 col-xs-offset-1"><div class="input-group input-group-lg"><span id="sizing-addon1" class="input-group-addon"><i class="fa fa-lock fa-lg"></i></span><input type="password" placeholder="Password" ng-model="credentials.password" class="form-control"></div></div></div></div><div class="form-group"><div class="row"><div class="col-md-10 col-xs-10 col-md-offset-1 col-xs-offset-1"><input type="submit" value="Sign In" ng-click="doLogin()" ng-disabled="loginForm.$invalid" class="btn btn-primary btn-lg btn-block"></div></div></div></form></div></div></div></nav>');
}]);
})();
