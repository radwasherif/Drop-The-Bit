app.controller('businessController', function($scope, $http, Business, $location, $routeParams) {
  $scope.maxRating = 5;
  $scope.ratedBy = 0;
  $scope.avgRate = 0;
  $scope.sub = "Subscribe";
console.log($routeParams.id);
$scope.id = "58f20e01b38dec5d920104f3";
        Business.get($scope.id)
                .then(function(d) {
                  console.log(d.data.result._id+"!");
                        $scope.business = d.data.result;
                        $scope.phones = d.data.result.phones;
                        $scope.categories = d.data.result.category;
                        $scope.user = d.data.user;
                        $scope.methods = d.data.result.payment_methods;

                        $scope.facilities = d.data.facilities;
                        $scope.events = d.data.events; //once events
                        if(d.data.rate) $scope.ratedBy = d.data.rate;
                        $scope.check = 0;
                        $scope.avgRate = d.data.result.average_rating;
                        for(var i = 0; i < d.data.result.subscribers.length; i++) {
                          if(d.data.result.subscribers[i] == d.data.user) {
                              $scope.check = 1;
                              $scope.sub = "Unsubscribe";
                          }
                        }
                      console.log($scope.check);
                      console.log($scope.sub);
                });




         $scope.goToEdit = function() {
         	console.log("controller");
         	Business.edit($scope.formData)
         	.then(function(d) {
         		console.log(d.data.business._id);
            $location.path('/'+ d.data.business._id);
         	})
         };

         $scope.subscribe = function(id) {
         	console.log("controller subscribe");
         	Business.subscribe(id)
         	.then(function(d) {
         		console.log("sub done");
            $scope.sub = "Unsubscribe";
            $scope.check = 1;
         	})
        };

         $scope.unsubscribe = function(id) {
           console.log("controller unsubscribe");
           Business.unsubscribe(id)
           .then(function(d) {
             console.log("unsub done");
             $scope.sub = "Subscribe";
             $scope.check = 0;
           })
         };

         $scope.rateBy = function (star, bid) {
           console.log(star+"!");
           Business.rate(star, bid)
           .then(function(d) {
             console.log("rating done");
             $scope.avgRate = d.data.average_rating;
             console.log($scope.avgRate);
             console.log(d.data.average_rating);
             $scope.ratedBy = star;
           });
         };


         $scope.public = function(){
         	console.log('public ctrl');
         	Business.public()
         	.then(function(d){
         		console.log('public done');
         	})
        };

          $scope.remove = function(){
         	console.log('remove ctrl');
         	Business.remove()
         	.then(function(d){
         		console.log('remove done');
         	})
         };

         $scope.getEvent = function(businessId, eventId) {
          console.log("get Event ctrl");
          $location.path('/eventPage/' + businessId + '/' + eventId);
         };

        $scope.createFacility = function(id) {
          console.log("create facility controller");
          $location.path('/createFacility/'+ id);
        };


        $scope.createOneEvent = function(id) {
          console.log("create event controller"+id);
          $location.path('/createOneEvent/'+ id);
        };


        // $scope.goToEditFacility = function(facilityId) {
        //   console.log("edit facility controller");
        //   $locatin.path('/editFacility/' + facilityId);
        // }


    });
