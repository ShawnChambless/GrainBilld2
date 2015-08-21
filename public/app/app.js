angular.module('GrainBilld', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            controller: 'loginCtrl',
            templateUrl: 'app/login/loginTmpl.html'
        })
        .state('home', {
            url: '/home',
            controller: 'homeCtrl',
            templateUrl: 'app/home/homeTmpl.html',
            resolve: {
                getGrain: function(homeService) {
                    return homeService.getGrain().then(function(resp) {
                        return {grain: resp.data};
                    });
                },
                getHops: function(homeService) {
                    return homeService.getHops().then(function(resp) {
                        return {hops: resp.data};
                    });
                },
                getYeast: function(homeService) {
                    return homeService.getYeast().then(function(resp) {
                        return {yeast: resp.data};
                    });
                }
            }
        })
        .state('new-batch', {
            url: '/NewBatch',
            controller: 'newBatchController',
            templateUrl: 'app/newBatch/newBatchTmpl.html',
            resolve: {
                getGrain: function(homeService) {
                    return homeService.getGrain().then(function(resp) {
                        return resp.data;
                    });
                },
                getHops: function(homeService) {
                    return homeService.getHops().then(function(resp) {
                        return resp.data;
                    });
                },
                getYeast: function(homeService) {
                    return homeService.getYeast().then(function(resp) {
                        return resp.data;
                    });
                }
            }
        })
        .state('ingredientInfo', {
            url: '/IngredientInfo',
            controller: 'ingredientInfoController',
            templateUrl: 'app/ingredientInfo/ingredientInfoTmpl.html'
        })
        .state('myRecipes', {
            url: '/MyRecipes',
            controller: 'myRecipesController',
            templateUrl: 'app/myRecipes/myRecipesTmpl.html'
        })
        .state('communityRecipes', {
            url: '/CommunityRecipes',
            controller: 'communityRecipesController',
            templateUrl: 'app/CommunityRecipes/communityRecipesTmpl.html'
        });
});
