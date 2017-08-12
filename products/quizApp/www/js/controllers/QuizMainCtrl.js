"use strict";

quizApp.controller('QuizMainCtrl', function QuizMainCtrl($rootScope, $scope, $location, $timeout, $localStorage,$stateParams, quizList, attemptModel, quizModel) {
    $scope.quiz = quizModel.initialize(quizList.getQuestionBank($stateParams.quizId));
    $scope.qid = $stateParams.quizId;
    $scope.currentPosition = -1;
    $scope.timeOut = false;
    $scope.$storage = $localStorage;
    
    
    
    if($stateParams.qid>0){
      $scope.$storage.currentPosition=$stateParams.qid;
    }
    
    
    if($scope.$storage.attempt === undefined){
      $scope.attempt = attemptModel.initialize($scope.quiz);
      $scope.$storage.attempt = $scope.attempt;
      $scope.$storage.startTime = $scope.startTime;

      //arrange question in sequence
      var i=0;
      var qSeq=[];
      angular.forEach($scope.quiz.questions, function (q) {
          qSeq[i]=i;
          i++;
      });
     
      if ($scope.quiz.isRandom ) {
        var arg=qSeq;
        for (var j, x, i = arg.length; i; j = parseInt(Math.random() * i), x = arg[--i], arg[i] = arg[j], arg[j] = x);
        $scope.$storage.attempt.seq=arg; //random question here
      }else{
        $scope.$storage.attempt.seq=qSeq;
      }
    }else{
      $scope.attempt = $scope.$storage.attempt;
    }

    if($scope.$storage.currentPosition>0){
      
      $scope.currentPosition = $scope.$storage.currentPosition;
      
      $scope.startTime = $scope.$storage.startTime;
      $scope.timeOut = $scope.$storage.timeOut;
    }else{
      $scope.currentPosition = 0;
      $scope.startTime = 9999;
      $scope.currentTime = $scope.quiz.duration;
    }

    
    
            /**/
    
    $scope.hasNext = function () {
        return !($scope.currentPosition >= $scope.quiz.questions.length - 1);
    };
    
    
    $scope.hasPrev = function () {
        return !($scope.currentPosition === 0 );
    };
    
    
    $scope.updatePage = function (mov) {
      $scope.currentPosition += mov; 
      $scope.$storage.attempt=$scope.attempt;
      var pos=$scope.$storage.attempt.seq[$scope.currentPosition];
      $scope.currentQuestion = $scope.quiz.questions[pos];
      $scope.qFlag = $scope.attempt.attempt[pos].qFlag;
      $scope.currentResponse = $scope.attempt.attempt[pos].attempt;
      $scope.$storage.currentPosition=$scope.currentPosition;
      $scope.$storage.currentTime = $scope.currentTime;
    };
    
    $scope.jumbelOptions = function(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
    }
    
    


    
    $scope.handleDrop = function(index) {
        var selArr=[];
        
        
        selArr=$scope.currentResponse.split(",");
        selArr[index]="9";
        $scope.currentResponse=selArr.join(",");
    };
    
    
    
    $scope.checkboxChange = function(cid,val) {
        var selArr=[];
        cid=cid.toString();
        
        selArr=$scope.currentResponse.split(",");
        if (val === true) {
          selArr.push(cid);
        }
        else 
        {
          
          
          var ind=selArr.indexOf(cid);
          selArr.splice(ind,1);
        }
        $scope.currentResponse=selArr.join(",");
    };
    
    
    
    $scope.submitAns = function (id,act) {
        if ($scope.currentResponse != "") {
            $scope.attempt.attempt[id-1].attempt = $scope.currentResponse;
        }
        //$scope.attempt.attempt[id-1].qFlag = $scope.qFlag;
        if(act==1)
          $scope.next();
        else if(act==-1)
          $scope.prev();
        else{
          $scope.updatePage(0);
          var reviewPth=('#/review/'+$scope.qid);
          window.location.href=(reviewPth);
          //$location.path(reviewPth);
        }
          
          
    };

    
    
    
    $scope.isAnswered = function () {
        return ($scope.currentResponse !== "" && $scope.currentResponse !== undefined)
    };

    
    
    $scope.next = function () {
        var valid = $scope.hasNext();
        if (valid === true) {
            $scope.updatePage(1);
            //$rootScope.$broadcast('restart_timer');
        } else {
            $scope.updatePage(0); // reload same to set attempt var
            $rootScope.quizSize = $scope.quiz.questions.length;
            $rootScope.user = $scope.user;
            $rootScope.attempt = $scope.attempt;
            var reviewPth=('#/review/'+$scope.qid);
            window.location.href=(reviewPth);
        }
    };
    
    
    
    $scope.prev = function () {
        var valid = $scope.hasPrev();
        if (valid === true) {
            $scope.updatePage(-1);
        } else {
            // Reached first question no action needed // can disable button
        }
    };

    
    
    $scope.quit = function () {
        $rootScope.username = "";
        $location.path('/');
    };
    
    
    
    $scope.continueAttempt = function () {
        $location.path('/quiz');
    };
    
    
    
    $scope.reviewExam = function(){
      $scope.updatePage(0); // reload same to set attempt var
      $rootScope.quizSize = $scope.quiz.questionnaire.length;
      $rootScope.user = $scope.user;
      $rootScope.attempt = $scope.attempt;
      $location.path('/result');
      
    };
    
    
    
    $scope.ticktock = function (starttime){
     //check if server time is also time out///
     if(starttime>0){
        var d = Number(starttime);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        var hhmmss =((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s); 

       $timeout(function(){starttime--; $scope.timer=hhmmss; $scope.ticktock(starttime);},1000);
     }else{
       $scope.syncTimer($scope.exam);
     }
    };
    
    
   /*
    $scope.syncTimer = function (tim){
      $http({
        url: 'time.php?eid='+tim,
        method: 'GET',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        
      })
      .then(function(response) {
        if(response.data>0){
          //start local timer//
          $scope.ticktock(response.data);
        }
        else if(response.data=="TIMEOUT"){
          alert("--- TIME OVER ---");
          $location.path('/result/end');
        }
      }, 
      function(response) { // optional

      }
      );
    };
    */
    
    

    $scope.endExam = function (ask) {
        if(ask)
          var r=confirm("Are you Sure to End Exam? \n\nNOTE: Once submited it cannot be reopened.");
        else
          r=true;
        
        if (r==true)
          {
          //Process to end exam//
          $localStorage.attempt.username=$localStorage.attempt.username;
          $localStorage.attempt.attempt.exam=($localStorage.exam);
          $http({
            url: '../clientScript/saveAttempt.php',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param($localStorage.attempt)
          })
          .then(function(response) {
              
              alert("Congrats !!! Your attempt is saved.\nNote down your response ID:"+ response.data);
              $rootScope.$broadcast('quiz_over');
              
              $localStorage.$reset();
              delete $localStorage.attempt;
              delete $localStorage.username;
              delete $localStorage.currentPosition
              window.localStorage.clear() ;
              $location.path('/');
            }, 
            function(response) { // optional
                alert("ERROR in upload ! please try again OR contact admin");
            }
          );
        }
        else
        {
          alert("Please review and end exam");
        }


    };
    $scope.updatePage(0); // load on same position
    //$scope.syncTimer($scope.exam);
});
