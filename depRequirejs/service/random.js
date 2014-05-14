define(['angular'], function(angular) {
	var randomModule = angular.module('rands', []);
	randomModule.factory('randGenerator', [function() {

		var rG = {};

		rG.random = function(config) {
			var args =  Array.prototype.slice.call(arguments, 0);
			var from, to, number;
			config = angular.extend({from: 0, to: 1, number: 1, isInteger: false}, config);
			/*
			angular.forEach(args, function(arg, idx) {
				if (typeof arg !== 'number') {
					throw 'arguments of random service must be number';
				}
			});*/
			var ans = [];
			for (var i = 0; i < config.number; i++) {
				ans.push(config.from + Math.random() * (config.to - config.from + 1));
			}

			if (config.isInteger == true) {
				angular.forEach(ans, function(a, idx) {
					ans[idx] = Math.floor(a);
				});
			}

			return ans;
		}

		rG.randomPick = function(candidates, number) {
			if (!candidates)
				return undefined;
			if (typeof candidates === 'string') {
				var strtmp = candidates;
				candidates = [];
				angular.forEach(strtmp, function(c, idx) {
					candidates.push(c);
				});
			}
			
			number = number || 1;
			var idx
			,	ret = [];
			for (var i = 0; i < number; i++) {
				idx = this.random({from: 0, to: candidates.length - 1, number: 1, isInteger: true});
				ret.push(candidates[idx]);
			}
			return ret;
		};

		function isInt(n) {
 			return typeof n === 'number' && n % 1 == 0;
		}
		return rG;
	}]);

	return randomModule;
});