define(['angular', 'services/random'], function(angular, users, random){
	var services = angular.module('services', [users.name, random.name]);
	return services;
});