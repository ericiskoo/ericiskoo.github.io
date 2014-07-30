var portfolioApp = angular.module('portfolioApp', ['ngRoute', 'ngAnimate']);

portfolioApp.directive('myScroll', function($rootScope, $anchorScroll) {
    return function(scope, element) {
        $rootScope.$on('$routeChangeStart', function() {
           $anchorScroll(); 
        });
    };
});

portfolioApp.controller('MainCtrl', function($scope, $location, $routeParams) {
  $scope.isActive = function(route) {
    if ($location.path()=='/' && route=='/projects') {
      return true;
    }
    return $location.path().indexOf(route) > -1;
  }
});

portfolioApp.controller('ProjectCtrl', function($scope, $routeParams) {
  $scope.descUrl = 'partials/projects/desc/'+$routeParams.projectNav+'.html';
  $scope.galleryUrl = 'partials/projects/gallery/'+$routeParams.projectNav+'.html';
  $scope.projects = ['resmaps','jstor','courseviz','courserec','coursera','chi','forddirect','smithsonian','aata'];
  $scope.projectTitles = ['ResMaps','JSTOR Teachable Articles','UMSI Course Visualization Tool','UMSI Course Recommender System','UM Coursera Data Analysis','CHI Student Design Competition: SpeakEasy','FordDirectUsed.com','Smithsonian Collections Blog','AATA Mobile App Redesign'];
  $scope.projectIndex = $scope.projects.indexOf($routeParams.projectNav);
});

portfolioApp.controller('ResumeCtrl', function($scope) {
  $scope.resizeCrossDomainIframe = function(id, other_domain) {
    var iframe = document.getElementById(id);
    window.addEventListener("message", function(event) {
      if (event.origin !== other_domain) {
        return;
      }
      if (isNaN(event.data)) {
        return;
      }
      var height = parseInt(event.data);
      iframe.height = height + "px";
    }, false);
  }
});

portfolioApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
			templateUrl : 'partials/projects.html'
		})

		.when('/projects', {
			templateUrl : 'partials/projects.html'
		})
    
    .when('/projects/:projectNav', {
      templateUrl: 'partials/projects/project.html',
      controller: 'ProjectCtrl'
    })

    .when('/resume', {
      templateUrl : 'partials/resume.html',
      controller: 'ResumeCtrl'
    })

		.when('/about', {
			templateUrl : 'partials/about.html'
		});
});

