angular.module('GrainBilld', ['ui.router', 'angular-loading-bar', 'ngCookies'])
.run(function($rootScope, $http, $cookies) {
        $rootScope.currentUser = $cookies.getObject('user');
        if($rootScope.currentUser ) $rootScope.showLogIn = true;
        else getCurrentUser();
    function getCurrentUser() {
        return $http({
            method: 'GET',
            url: '/api/users/getUser'
        }).then(function(resp) {
            if(resp.data) {
                $cookies.putObject('user', {
                    id: resp.data._id,
                    firstName: resp.data.firstName
                });
                $rootScope.showLogIn = true;
                $rootScope.currentUser = resp.data;
            }
            else return;
        });
    }
})
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
                getRecipeTotals: function(homeService) {
                    return homeService.getRecipeTotals().then(function(resp) {
                        console.log(resp);
                        return resp.data;
                    });
                },
                getCommunityRecipes: function(communityRecipesService) {
                    return communityRecipesService.getCommunityRecipes().then(function(resp) {
                        return resp.data;
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
            templateUrl: 'app/ingredientInfo/ingredientInfoTmpl.html',
            controller: 'ingredientInfoController',
            resolve: {
                getIngredients: function(homeService) {
                    var ingredients = {};
                    return (
                        homeService.getGrain().then(function(resp) {
                            ingredients.grain = resp.data;
                        }),
                        homeService.getHops().then(function(resp) {
                            ingredients.hops = resp.data;
                        }),
                        homeService.getYeast().then(function(resp) {
                            ingredients.yeast = resp.data;
                            return ingredients;
                        })
                    );
                }
            }
        })
        .state('myRecipes', {
            url: '/MyRecipes/:userId',
            controller: 'myRecipesController',
            templateUrl: 'app/myRecipes/myRecipesTmpl.html',
            resolve: {
                checkUserLoggedIn: function($state, $rootScope, myRecipesService) {
                    if($rootScope.currentUser) {
                        return myRecipesService.getRecipes($rootScope.currentUser.id).then(function(resp) {

                            return {recipes: resp.data};
                        }, function(err) {
                            $state.go('home');
                        });
                    }
                    else return;
                }
            }
        })
        .state('communityRecipes', {
            url: '/CommunityRecipes',
            controller: 'communityRecipesController',
            templateUrl: 'app/CommunityRecipes/communityRecipesTmpl.html',
            resolve: {
                getCommunityRecipes: function($state, communityRecipesService) {
                    return communityRecipesService.getCommunityRecipes().then(function(resp) {
                        console.log(resp.data);
                        return {recipes: resp.data};
                    }, function(err) {
                        $state.go('home');
                    });
                }
            }
        });
});
