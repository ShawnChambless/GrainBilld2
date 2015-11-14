angular.module('GrainBilld')
.controller('homeCtrl', function($scope, homeService, getGrain, getHops, getYeast, $cookies, $rootScope) {
    $scope.grain    = getGrain.grain;
    $scope.hops     = getHops.hops;
    $scope.yeast    = getYeast.yeast;

    $rootScope.logOut = function() {
        $cookies.remove('user');
        $scope.apply();
    };

});
