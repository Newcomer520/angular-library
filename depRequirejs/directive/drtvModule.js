define(['angular', 'directives/customDrtv', 'directives/depboard'], function(angular, customDrtv) {
	var directives = angular.module('directives', [customDrtv.name]);

	return directives;
});