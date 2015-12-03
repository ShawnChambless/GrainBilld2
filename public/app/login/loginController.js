angular.module('GrainBilld')
.controller('loginCtrl', function($scope, loginService, $state, $rootScope, $cookies) {
    $scope.register = function(firstName, lastName, email, password) {
        loginService.register(firstName, lastName, email, password).success(function(resp) {
            $cookies.putObject('user', {
                id: resp._id,
                firstName: resp.firstName
            });
            $rootScope.currentUser = $cookies.getObject('user');
            $scope.email = $scope.password = '';
            $rootScope.showLogIn = true;
            $scope.showSuccess = true;
            $scope.showError = false;
        }).error(function(err) {
            $scope.showError = true;
        });
    };
    $scope.login = function(email, password) {
        loginService.login(email, password).success(function(resp) {
            $cookies.putObject('user', {
                id: resp._id,
                firstName: resp.firstName
            });
            $rootScope.currentUser = $cookies.getObject('user');
            $scope.email = $scope.password = '';
            $rootScope.showLogIn = true;
            $scope.showSuccess = true;
            $scope.showError = false;
        }).error(function(err) {
            $scope.showError = true;
        });
    };
});
