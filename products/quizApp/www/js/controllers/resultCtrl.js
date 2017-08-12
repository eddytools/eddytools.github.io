"use strict";
quizApp.controller('resultCtrl', function HomeCtrl($rootScope, $scope, $location,$stateParams, $localStorage,$http) {
    $scope.attempt = $localStorage.attempt;
    $scope.timeOut =$localStorage.timeOut;
    $scope.quizSize = $rootScope.quizSize;
    $scope.qid = $stateParams.quizId;
    
    $scope.score=0;
    $scope.total=0;
    
    $scope.tot_correct=0;
    $scope.tot_wrong=0;
    $scope.tot_unattempted=0;
    
    angular.forEach($scope.attempt.attempt, function (a) {
      $scope.total++;
      if(a.correct==a.attempt){
        $scope.score++;
        $scope.tot_correct++;
      }
      if(a.attempt==""){
        $scope.tot_unattempted++;
      }
      
    });
    
    
    
    $scope.tot_wrong = $scope.total-($scope.tot_correct+$scope.tot_unattempted)
    $scope.percent = ($scope.score/$scope.total)*100 + "%";
   
    
    $scope.rdata =([
            ['Result', 'Report'],
            ['Correct',  $scope.tot_correct ],
            ['Wrong',      $scope.tot_wrong],
            ['Unattempted',  $scope.tot_unattempted]

    ]);
    
    
   
    $scope.chart = {
      "type": "PieChart",
      "displayed": true,
      "cssStyle": "width:100%;",
      "data":$scope.rdata, 

      "options": {
        "title": "Attempt Report",
        "isStacked": "true",
        "fill": 20,
        is3D: true,
        "displayExactValues": true,
        "hAxis": {
          "title": "Date"
        }
      },
      "formatters": {}
    };



    
    $scope.backtoMain =function (qid){
      $localStorage.$reset();
      delete $localStorage.attempt;
      delete $localStorage.username;
      delete $localStorage.currentPosition;
      window.localStorage.clear() ;
      $localStorage.currentPosition=qid;
      var mainPath=('#/tab/myquiz');
      window.location.href=(mainPath);
    }
});


