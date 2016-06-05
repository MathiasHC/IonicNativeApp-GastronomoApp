var baseUrl = 'http://api.casperschultz.info/wp-json/ron/v1/';


angular.module('starter.controllers', [])

.controller('IndexCtrl', function($scope, $http) {
  /*
   * Controller for frontpage (frontpage.html)
   */

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

.controller('MenuCtrl', function($scope, $http) {

  $http({
    method: 'GET',
    url: baseUrl + 'menu'
  }).then(function successCallback(response) {
    $scope.types = response.data;
  });

  /* ACCORDION LOGIC
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };

  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

})

.controller('AboutCtrl', function($scope, $http) {

  $http({
    method: 'GET',
    url: baseUrl + 'about'
  }).then(function successCallback(response) {
    $scope.title = response.data.post_title;
    $scope.body = response.data.post_content;
  });

  //$http({
  //  method: 'GET',
  //  url: baseUrl + 'facebook'
  //}).then(function successCallback(response) {
  //  $scope.picture = response.data.picture;
  //  $scope.link = response.data.link;
  //  $scope.feed = [];
  //
  //  response.data.posts.forEach(function(entry) {
  //    if (entry.message) {
  //      $scope.feed.push(entry);
  //    }
  //  });
  //});

})

.controller('ContactCtrl', function($scope, $http, $httpParamSerializerJQLike) {

  $scope.contact = {};
  $scope.success = "";

  $http({
    method: 'GET',
    url: baseUrl + 'contact'
  }).then(function successCallback(response) {
    $scope.title = response.data.post_title;
    $scope.body = response.data.post_content;
  });


  $scope.sendMail = function() {

    if (!$scope.contact.name || !$scope.contact.mail || !$scope.contact.msg) {
      $scope.error = "Alle felter skal udfyldes";
      return;
    }

    $http({
      method: 'POST',
      url: baseUrl + "sendemail",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: $httpParamSerializerJQLike($scope.contact)
    }).then(function(result, status) {

      if (result.data = true) {
        $scope.msg = "Din besked er nu sendt og vi vil vende tilbage hurtigst muligt."
      }

    }, function(error) {
      $scope.error = "Din besked kunne ikke sendes. Prøv venligst igen";
    });

  }

});
