angular.module('fasa7ny')
    .factory('Search', ['$http', 'IP', function ($http, IP) {
        var factory = {};
        factory.get = function () {
            return $http.get('http://' + IP.address + ':3000/search');

        }

        return factory;
    }]); 