angular.module('starter.controllers', ['ngSanitize'])


// A simple controller that fetches a list of data from a service
.controller('SplashCtrl', function($scope, $timeout) {
  $timeout(function(){ $scope.redirect(); },200);
  $scope.redirect = function(){
    window.location.href=("#/tab/myquiz");
  }
})


// A simple controller that fetches a list of data from a service
.controller('QuizIndexCtrl', function($scope, quizList,$localStorage) {
  // "Pets" is a service returning mock data (services.js)
  $scope.quizes = quizList.all();
  $localStorage.$reset();
  delete $localStorage.attempt;
  delete $localStorage.username;
  delete $localStorage.currentPosition;
  window.localStorage.clear() ;
})




// A simple controller that shows a tapped item's data
.controller('QuizDetailCtrl', function($scope, $stateParams, quizList) {
  // "Pets" is a service returning mock data (services.js)
  $scope.quiz = quizList.getInstruction($stateParams.quizId);
})



// A simple controller that shows a tapped item's data
.controller('QuizReviewCtrl', function($scope, $stateParams, quizList) {
  // "Pets" is a service returning mock data (services.js)
  $scope.quiz = quizList.getInstruction($stateParams.quizId);
})


// A simple controller that shows a tapped item's data
.controller('QuizReportCtrl', function($scope, $stateParams, quizList) {
  // "Pets" is a service returning mock data (services.js)
  //$scope.quiz = quizList.get($stateParams.quizId);
})





// A simple controller that shows a tapped item's data
.controller('QuizSplashCtrl', function($scope, $stateParams, quizList) {
  // "Pets" is a service returning mock data (services.js)
  $scope.quiz = quizList.get($stateParams.quizId);
});
