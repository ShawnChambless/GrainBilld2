angular.module('GrainBilld')
.controller('navCtrl', function($rootScope, $scope, $cookies) {
    $scope.logOut = function() {
        $cookies.remove('user');
    };
});
