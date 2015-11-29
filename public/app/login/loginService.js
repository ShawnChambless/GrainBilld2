angular.module('GrainBilld')
.service('loginService', function($http, $state) {
    this.register = function(firstName, lastName, email, password) {
        return $http({
            method: 'POST',
            url:    'http://localhost:8080/auth/local/signup',
            data: {
                firstName:  firstName,
                lastName:   lastName,
                email:      email,
                password:   password
            }
        }).then(function(resp) {
            if(resp.status == 200) $state.go('home');
            return resp.data;
        }, function(err) {
            return err;
        });
    };

    this.login = function(email, password) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8080/auth/local/login',
            data: {
                email:      email,
                password:   password
            }
        }).then(function(resp) {
            if(resp.status == 200) $state.go('home');
            return resp.data;
        }, function(err) {
            return err;
        });
    };
});
