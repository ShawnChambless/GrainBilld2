angular.module('GrainBilld')
.service('loginService', function($http) {

    // this.getCurrentUser = function() {
    //     return $http({
    //         method: 'GET',
    //         url:    'http://localhost:8080/api/user/'
    //     }).then(function(resp) {
    //         return resp.data;
    //     }, function(err) {
    //         return err;
    //     });
    // };

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
            return resp.data;
        }, function(err) {
            return err;
        });
    };
});
