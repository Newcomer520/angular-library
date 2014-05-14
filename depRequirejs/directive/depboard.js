define(['directives/customDrtv'], function(customDrtv) {
	customDrtv.directive('depboard', ['randGenerator', '$interval', '$compile', '$timeout', function(randGenerator, $interval, $compile, $timeout) {
		var drtv = {
			restrict: 'AE',
			transclude: true,
			scope: {
				text: '@text'
			},
			template: ' <span ng-transclude></span>',
			link: function(scope, element, attrs, ctrl, $transclude) {
				var text = scope.text;
				var words = 'abcdefghijklmnopqrstuvwxyz';
				words = words + words.toUpperCase() + '0123456789';
				var idx = 0;
				var output = randGenerator.randomPick(words, text.length).join('');
				
				//element.text(output);			
				element.empty();
				var spans = [];
				for (var i = 0; i < text.length; i++) {
					spans.push(angular.element('<span>'));
					element.append(spans[i]);
				}
				$interval(function() {
					var thisIdx = idx;
					var totalTime = 0
					,  stepTime = 100
					,  stopQuata = randGenerator.random({from: 0, to: 2000, number: 1, isInteger: true})[0];
					var stop = 
					$interval(function() {						
						totalTime += stepTime;
						var stopped = false;
						var c = randGenerator.randomPick(words + text[thisIdx]).join('');
						spans[thisIdx].text(c);
						if (c == text[thisIdx] && totalTime >= 1000)  {
							$interval.cancel(stop);
							stopped = true;
						}
						
						if (totalTime >= 2000 + stopQuata) {
							spans[thisIdx].text(text[thisIdx]);							
							$interval.cancel(stop);
							stopped = true;
						}
						if (thisIdx == text.length - 1 && stopped == true) {
							//hook on hover
							element.on('mouseover', function() {
								spans.forEach(function(c2, cIdx) {
									var totalTime2 = 0;
									var stop2 = 
										$interval(function(){
											c = randGenerator.randomPick(words + text[cIdx]).join('');
											spans[cIdx].text(c);
											totalTime2 += stepTime;
											if (totalTime2 >= 1000) {
												spans[cIdx].text(text[cIdx]);
												$interval.cancel(stop2);
											}
										}, stepTime / 2);
								})						
							});
						}
					}, stepTime);
					
					idx++;					
				}, 1, text.length);
			}
		};		
		return drtv;
	}]);
});