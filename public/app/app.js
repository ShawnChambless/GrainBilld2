angular.module('GrainBilld', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('login', {
            url: '/login',
            controller: 'loginCtrl',
            templateUrl: 'app/login/loginTmpl.html'
        })
        .state('home', {
            url: '/',
            controller: 'homeCtrl',
            templateUrl: 'app/home/homeTmpl.html'
        });
});
