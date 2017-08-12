'use strict';

quizApp.factory('attemptModel', function () {
    return {
        initialize: function (data) {
            var attempt = {};
            attempt.auid = data.auid;
            attempt.username = data.username;
            attempt.password = data.password;
            
            attempt.attempt = [];
            // For each question create array to capture attempted answer
            console.log(data.questions);
            angular.forEach(data.questions, function (q) {
              var qAttempt = {};
              qAttempt.slot=q.slot;
              qAttempt.attempt="";
              qAttempt.type=q.type;
              qAttempt.qid=q.qid;
              qAttempt.correct=q.correct;
              attempt.attempt.push(qAttempt);
              });
              
            return attempt;
        }
    };
});

