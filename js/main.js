var myApp = angular.module('app', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl : 'templates/mainView.html'
  })
  .when('/article', {
  	templateUrl : 'templates/articleView.html',
  	controller : 'articleCtrl'
  })
  .otherwise({
    redirectTo : '/'
  });
}]);

// article controller
myApp.controller('articleCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('http://192.168.4.106/html/larafrs/public/api/contents?limit=30&offset=0&type=article').then(function(resp) {
	    $scope.articles = resp.data.data;
	    console.log($scope.articles);
	  }, function(err) {
	    console.error('ERR', err);
	    // err.status will contain the status code
	  })
}]);


// .controller('MainCtrl', function($scope, $http) {
//   $http.get('http://192.168.4.106/html/larafrs/public/api/contents?limit=1&offset=0&type=article').then(function(resp) {
//     $scope.data = resp.data.data;
//     console.log($scope.data);
//   }, function(err) {
//     console.error('ERR', err);
//     // err.status will contain the status code
//   })
// });















// var app = angular.module('app', [])

// .controller('MainCtrl', function($scope, $http) {
//   $http.get('http://192.168.4.106/html/larafrs/public/api/contents', {params:{"param1": val1, "param2": val2}}).then(function(resp) {
//     $scope.data = resp.data;
//     console.log($scope.data);
//   }, function(err) {
//     console.error('ERR', err);
//     // err.status will contain the status code
//   })
// });