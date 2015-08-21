angular.module('GrainBilld')
.controller('homeCtrl', function($scope, homeService, getGrain, getHops, getYeast) {
    $scope.grain    = getGrain.grain;
    $scope.hops     = getHops.hops;
    $scope.yeast    = getYeast.yeast;
});
