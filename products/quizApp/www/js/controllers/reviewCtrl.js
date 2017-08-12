"use strict";

quizApp.controller('reviewCtrl', function HomeCtrl($rootScope, $scope, $location,$stateParams, $localStorage,$http) {
    $scope.attempt = $localStorage.attempt;
    $scope.timeOut =$localStorage.timeOut;
    $scope.quizSize = $rootScope.quizSize;
    $scope.qid = $stateParams.quizId;
    console.log($localStorage);
   
    $scope.backtoQuiz =function (qid){
      $localStorage.currentPosition=qid;
      var quizPath=('#/main/'+$scope.qid);
      window.location.href=(quizPath);
    }
    $scope.endExam = function (ask) {
        if(ask)
          var r=confirm("Are you Sure to End Exam? \n\nNOTE: Once submited it cannot be reopened.");
        else
          r=true;
        
        if (r==true)
        {
          var resultPath=('#/result/'+$scope.qid);
          window.location.href=(resultPath);
        }
        else
        {
          alert("Please review and end exam");
        }
    };
});


