angular.module('starter', ['ionic', 'angularMoment'])

.controller("RedditController", function($http, $scope) {
    $scope.stories = [];
    
    function loadStories(params, callback) {        
        $http.get('https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=c342b6124f58424686f39eaf448cf652', {params: params})
            .success(function(response) {
                var stories = [];
                //angular.forEach(response, function(child) {
                    stories.push(response.articles);
                //});
                callback(stories);
            });
    }
    
    $scope.loadOlderStories = function() {
        var params = {};
        if($scope.stories.length > 0) {
            params['after'] = $scope.stories[$scope.stories.length - 1].title;
        }
        loadStories(params, function(olderStories) {
            $scope.stories = $scope.stories.concat(olderStories);
            $scope.$broadcast('scroll.infiniteScrollComplete'); 
        });
    };
    
    $scope.loadNewerStories = function() {
        var params = {'before': $scope.stories[0].title};
        loadStories(params, function(newerStories) {
            $scope.stories = newerStories.concat($scope.stories);
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    
    $scope.openLink = function(url) {
        window.open(url, '_blank');
    };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.cordova && window.cordova.InAppBrowser) {
      window.open = window.cordova.InAppBrowser.open;
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
