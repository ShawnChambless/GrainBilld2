angular.module('GrainBilld')
.controller('homeCtrl', function($scope, homeService) {
    $scope.test = homeService.test;
});
