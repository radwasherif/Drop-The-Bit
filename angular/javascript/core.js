
var app = angular.module('fasa7ny',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	// .when("/",{
	// 	templateUrl : "./public/views/index.ejs",
	// 	controller  : "homepageController" 
	// })

	.when("/", {
		templateUrl : "views/bookings.html",
		controller  : "bookingController"
	})
	.when("/book_facility", { //I want the facility name to be passed in the url
		templateUrl : "views/booking_facility.html",
		controller  : "bookFacilityController"
	})

});	