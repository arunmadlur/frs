var myApp = angular.module('app', ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl : 'templates/mainView.html'
  })
  .when('/tags', {
    templateUrl : 'templates/tags.html',
    controller : 'tagsCtrl'
  })
  .when('/category/:cat', {
   templateUrl : 'templates/catView.html',
   controller : 'categoryCtrl'
 })
  .otherwise({
    redirectTo : '/'
  });
}]);


myApp.controller('mainCtrl', ['$scope', function($scope){
  $scope.searchBar = false;

  $scope.showSearchBar = function(){
    $scope.searchBar = true; 
    document.getElementById("top_search").focus();
  }

  $scope.showSearchBar_close = function(){
    $scope.searchBar = false;
    $scope.global_search = "";
  }



}]);



// categoryCtrl controller ------------------
myApp.controller('categoryCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

  $scope.getPage = function(e){

  //console.log($scope.a_name);

  $scope.currentPage = e;
      //console.log($scope.currentPage);
      $scope.offset = ($scope.currentPage-1)*30;
      //console.log($scope.offset);

      $scope.changeFun = function(){
       $scope.a_name = $scope.author_name;
       console.log($scope.a_name);
       $scope.callApi($scope.a_name);
     };

     $scope.callApi = function(name){
       $http.get("http://192.168.4.106/html/larafrs/public/api/contents", {params:{"limit":30, "offset":$scope.offset, "type":$routeParams.cat, "author_name":name}})
       .then(function(resp) {
        $scope.allCategoryLength = parseInt(resp.data.total);
          //console.log($scope.allCategoryLength);
          $scope.categoryData = resp.data.data;
          console.log($scope.categoryData);
          $scope.category_name = $routeParams.cat;
          console.log($scope.category_name);

          $scope.watchFunction();
        }, function(err) {
          //console.error('ERR', err);
          // err.status will contain the status code
        });
     };
     
     if(!$scope.a_name == ""){
       $scope.changeFun($scope.a_name);
     }else{
      $scope.callApi();     
    };

  };
  //console.log($scope.numPages)
  $scope.getPage(1);

  $scope.filteredCategoryData = [];
  $scope.currentPage = 1;



  $scope.watchFunction = function(){
    $scope.$watch('currentPage + numPerPage', function() {
      $scope.filteredCategoryData = $scope.categoryData;
    });
  };



  $scope.cardSelected = function(ind){
    $scope.currentSelection = ind;
  };


  // api for author name
  $http.get("http://192.168.4.106/html/larafrs/public/api/authors").then(function(resp) {
    $scope.authors = resp.data.data;
  }, function(err) {
    //console.error('ERR', err);
    // err.status will contain the status code
  });


}]);


// local json call
// myApp.controller('articleCtrl', ['$scope', '$http', function($scope, $http){

//   $scope.$watch($http.get("templates/data.json")
//     .then(function(response) {
//         $scope.categoryData = response.data.data;
//         console.log($scope.categoryData);
//          $scope.watchFunction();
//     }));


//     $scope.filteredCategoryData = [];
//     $scope.currentPage = 1;
//     $scope.numPerPage = 10;
//     $scope.maxSize = 5;


//     $scope.watchFunction = function(){
//       $scope.$watch('currentPage + numPerPage', function() {
//         var begin = (($scope.currentPage - 1) * $scope.numPerPage)
//         , end = begin + $scope.numPerPage;

//         $scope.filteredCategoryData = $scope.categoryData.slice(begin, end);
//       });
//     };


//     $scope.cardSelected = function(ind){
//       $scope.currentSelection = ind;
//       console.log($scope.currentSelection);
//     };

// }]);


myApp.controller("tagsCtrl", ['$scope', '$http', function($scope, $http){

// for(var i = 0; i < 26; i++){
//   var chr = String.fromCharCode(65 + i);
//   console.log(chr);
// }
$scope.number = 26;
$scope.getNumber = function(num) {
  return new Array(num);   
}

$scope.getAlpha = function(el){
  return String.fromCharCode(65 + el);
}

$http.get("http://192.168.4.106/html/larafrs/public/api/tags").then(function(resp) {
  $scope.tags = resp.data.data;
  console.log($scope.tags)
}, function(err) {
    //console.error('ERR', err);
    // err.status will contain the status code
  });

$scope.edit = false;
$scope.edit_mode = function(el){
  $scope.edit = true;  
  $scope.currentTag = el;
  console.log($scope.currentTag);
};

$scope.close_edit_mode = function(){
  $scope.edit = false;
}

$scope.add = false;  
$scope.add_mode = function(){
  $scope.add = true;  
};

$scope.close_add_mode = function(){
  $scope.add = false;
}



// addTag function
$scope.addTags = function(newTag) {
  $scope.newTag = newTag;    
  var data = $.param({
    title: $scope.newTag
  });

  var config = {
    headers : {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  }

  $http.post("http://192.168.4.106/html/larafrs/public/api/tags", data, config)
  .success(function (data, status, headers, config) {
    $scope.PostDataResponse = data;
    document.getElementsByClassName('alert_box')[0].style.display = 'block';
    $scope.hide_alert_box();
    $scope.new_tag = "";
  })
  .error(function (data, status, header, config) {
    $scope.tag_error = true;

    // $scope.ResponseDetails = "Data: " + data +
    // "<hr />status: " + status +
    // "<hr />headers: " + header +
    // "<hr />config: " + config;
  });
}; 

$scope.hide_alert_box = function() {
  setTimeout(function(){ 
    document.getElementsByClassName('alert_box')[0].style.display = 'none';
  }, 2000);
}


// updateTag function
$scope.updateTag = function(currentTag){
  $scope.newUpdatedTag = currentTag;
};


// delete tag
$scope.deleteTag = function(el){
  $scope.currentTagId = el;
  console.log($scope.currentTagId);


  var data = $.param({
      id : $scope.currentTagId
  });

  var config = {
    headers : {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  }


  $http.delete('http://192.168.4.106/html/larafrs/public/api/tags/' + $scope.currentTagId, config)
    .success(function (data, status, headers) {
        $scope.ServerResponse = data;
    })
    .error(function (data, status, header, config) {
        
    });

};

}]);










