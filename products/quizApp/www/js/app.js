// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var quizApp = angular.module('starter', ['ionic', 'starter.services', 'starter.controllers', 'ngStorage','googlechart'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    //### setup an abstract state for the tabs directive ###//
    
    .state('splash', {
      url: '/splash',
      templateUrl: 'templates/splash.html',
      controller: 'SplashCtrl'
    })
    
    //###--- List of all quiz of user ---###//
    .state('tab', {
      url: "/tab",
      abstract: false,
      templateUrl: "templates/tabs.html"
    })
    
    
    
    //###--- List of all quiz of user ---###//
    /*
    .state('quiz', {
      url: "/quiz",
      abstract: false,
      templateUrl: "templates/quiz.html"
    })
    */
    

    
  
    //###--- List of all quiz of user ---###//
    .state('tab.quiz-index', {
      url: '/myquiz',
      views: {
        'myquiz-tab': {
          templateUrl: 'templates/quiz-index.html',
          controller: 'QuizIndexCtrl'
        }
      }
    })
    

    

    
    
    //###-- Main engine for Quiz ---###//
    .state('quiz-main', {
      url: '/main/:quizId',
      templateUrl: 'templates/quiz-main.html',
      controller: 'QuizMainCtrl'
      }
    )
      

    
    //###-- Main engine for Quiz Review ---###//
    .state('review', {
      url: '/review/:quizId',
          templateUrl: 'templates/quiz-review.html',
          controller: 'reviewCtrl'
     })
     
     
     //###-- Main engine for Quiz Review ---###//
    .state('result', {
      url: '/result/:quizId',
          templateUrl: 'templates/quiz-result.html',
          controller: 'resultCtrl'
     })
    

    
    //###---   Detail of quiz id      ---###//
    .state('quiz-detail', {
      url: '/quiz/:quizId',
      templateUrl: 'templates/quiz-detail.html',
      controller: 'QuizDetailCtrl'
      }
    )
      
     



    //###---   Report tab for selected quiz ---###//
    .state('tab.report', {
      url: '/report/:quizId',
      views: {
        'report-tab': {
          templateUrl: 'templates/report.html',
          controller: 'QuizReportCtrl'
        }
      }
    })
    
    
    
    //####   About Tab for EddyTools Assessment System ###//
    .state('tab.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/about.html'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splash');
  
});