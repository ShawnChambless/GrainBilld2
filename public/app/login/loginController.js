angular.module('GrainBilld')
.controller('loginCtrl', function($scope, loginService, $state, $rootScope) {
    $scope.register = function(firstName, lastName, email, password) {
        loginService.register(firstName, lastName, email, password).then(function(resp) {
            $scope.email = $scope.password = '';
            $scope.showSuccess = true;
            $state.go('home');
        }, function(err) {
            $scope.showError = true;
            $state.go('login');
        });
    };
    $scope.login = function(email, password) {
        loginService.login(email, password).then(function(resp) {
            $scope.email = $scope.password = '';
            $scope.showSuccess = true;
            $scope.showError = false;
            $state.go('home');
        }, function(err) {
            $scope.showError = true;
            $state.go('login');
        });
    };

    // $scope.getCurrentUser = function(userId) {
    //     loginService.getCurrentUser().then(function(resp) {
    //         if(currUser === user);
    //         $state.go('home');
    //     }).catch(function(err) {
    //         console.log(err);
    //     });
    // };
});
