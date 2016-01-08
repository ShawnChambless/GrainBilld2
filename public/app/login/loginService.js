angular.module('GrainBilld')
.service('loginService', function($http, $state) {
    this.register = function(firstName, lastName, email, password) {
        return $http({
            method: 'POST',
            url:    '/auth/local/signup',
            data: {
                firstName:  firstName,
                lastName:   lastName,
                email:      email,
                password:   password
            }
        }).success(function(resp) {
            $state.go('home');
            return resp.data;
        }).error(function(err) {
            return err;
        });
    };

    this.login = function(email, password) {
        return $http({
            method: 'POST',
            url: '/auth/local/login',
            data: {
                email:      email,
                password:   password
            }
        }).success(function(resp) {
            $state.go('home');
            return resp.data;
        }).error(function(err) {
            return err;
        });
    };
});
