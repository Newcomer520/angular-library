define(['angular', 'services/random'], function(angular, rands) {
	var customDrtvs = angular.module('customDrtvs', [rands.name]);
	return customDrtvs;
});