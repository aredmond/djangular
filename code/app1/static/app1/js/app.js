angular.module('App1', [
  'ui.router',
  'ngResource',
  'ngRoute',
  'App1.services',
  'App1.controllers',
])
  .config(function ($interpolateProvider, $httpProvider, $resourceProvider, $stateProvider, $urlRouterProvider) {
    // Force angular to use square brackets for template tag
    // The alternative is using {% verbatim %}
    $interpolateProvider.startSymbol('[[').endSymbol(']]');

    // CSRF Support
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    // This only works in angular 3!
    // It makes dealing with Django slashes at the end of everything easier.
    $resourceProvider.defaults.stripTrailingSlashes = false;

    // Django expects jQuery like headers
    // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Routing

    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'static/app1/partials/home.html',
        controller: 'TweetCtrl',
      })
      .state('examples', {
        url: '/',
        templateUrl: 'static/app1/partials/examples.html',
        controller: 'TweetCtrl',
      })
      .state('ideas', {
        url: '/',
        templateUrl: 'static/app1/partials/ideas.html',
        controller: 'TweetCtrl',
      })
      .state('tweets', {
        url: '/',
        templateUrl: 'static/app1/partials/tweet-list.html',
        controller: 'TweetCtrl',
      })
      .state('my-tweets', {
        url: '/:userId',
        templateUrl: 'static/app1/partials/tweet-list.html',
        controller: 'UserCtrl',
      })
      .state('profile', {
        url: '/profile/:userId',
        templateUrl: 'static/app1/partials/profile.html',
        controller: 'UserCtrl',
      })
  });
