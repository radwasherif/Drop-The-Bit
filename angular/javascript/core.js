
var app = angular.module('fasa7ny',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl : "views/bookings.html",
		controller  : "bookingController"
	})

	.when('/webAdminProfile',
	{
		templateUrl : 'views/webAdmin.html',
		controller  : 'webAdminController'
	})


});	