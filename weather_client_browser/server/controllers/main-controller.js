(function() {



	var weatherApp = angular.module('weatherApp', []);
	var server = "http://localhost:3000/api";

	var mainController = function ($scope, $http) {
		$scope.search = function (zip) {
			$scope.not_found = '';
    		$scope.loading = true;
			var parameters = {
				code : zip
			}
			$http.get(server, { params:parameters })
				.then(function(response) {
					if (response.data.forecast.simpleforecast.forecastday){
						$scope.forecastday = response.data.forecast.simpleforecast.forecastday;
						$scope.loading = false;
					} else {
						$scope.not_found = "No cities match your search query";
						$scope.loading = false;
					}
			});			
		}
	};
	// angular.module('directive.loading', [])
	// 	.directive('loading', ['$http', function ($http){
	// 		return {
	// 			restrict: 'A',
	// 			link: function (scope, elm, attrs){
	// 				scope.isLoading = function(){
	// 					return $http.pendingRequests.length > 0;
	// 				};
	// 				scope.$watch(scope.isLoading, function(v){
	// 					if(v){
	// 						elm.show();
	// 					} else {
	// 						elm.hide();
	// 					}
	// 				});
	// 			}
	// 		};
	// 	}]);
	weatherApp.controller('mainController', mainController);
}());