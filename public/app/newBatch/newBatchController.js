angular.module('GrainBilld')
.controller('newBatchController', function($scope, newBatchService, homeService, getGrain, getHops, getYeast) {

    $scope.grain    = getGrain;
    $scope.hops     = getHops;
    $scope.yeast    = getYeast;
    $scope.showGrainData = function() {
        $scope.showGrain    = true;
        $scope.showHops     = false;
        $scope.showYeast    = false;
    };

    $scope.showHopsData = function() {
        $scope.showGrain  = false;
        $scope.showHops   = true;
        $scope.showYeast  = false;
    };

    $scope.showYeastData = function() {
        $scope.showGrain    = false;
        $scope.showHops     = false;
        $scope.showYeast    = true;
    };

});
