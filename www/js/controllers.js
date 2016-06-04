var baseUrl = 'http://api.casperschultz.info/wp-json/ron/v1/';


angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $http) {

  $http({
    method: 'GET',
    url: baseUrl + 'menu'
  }).then(function successCallback(response) {
    $scope.types = response.data;
  });

})

.controller('AboutCtrl', function($scope, $http) {

  $http({
    method: 'GET',
    url: baseUrl + 'about'
  }).then(function successCallback(response) {
    $scope.title = response.data.post_title;
    $scope.body = response.data.post_content;
  });

  $http({
    method: 'GET',
    url: baseUrl + 'facebook'
  }).then(function successCallback(response) {
    $scope.picture = response.data.picture;
    $scope.link = response.data.link;
    $scope.feed = [];

    response.data.posts.forEach(function(entry) {
      if (entry.message) {
        $scope.feed.push(entry);
      }
    });
  });

})

.controller('ContactCtrl', function($scope) {

})
