
angular.module('fasa7ny')
.factory('Offers', ['$http', function($http) {
        return {
            get : function() {
                return $http.get('/offers/viewOffers');
            }

        }
    }]);