"use strict";

quizApp.factory('questionModel', function () {
    return {
        create: function (data, id) {
            var question = {};
            
            question.statement = data.question;
            if (data.answers !== null) {
                var options = new Array();
                var i=0;
                angular.forEach(data.answers, function (q) {
                  options[i]=[i,q];
                  i++;
                });
                question.options = options;
            }
            
            if (data.correct !== null) {
                question.correct = data.correct;
            }
            
            if (data.choice !== null) {
                question.choice = data.choice;
            }
            if (data.imageURL !== null) {
                question.imgPath = data.imageURL;
            }
            question.weightage = data.weight;
            question.isSCQ = (data.type === "radio");
            question.isMCQ = (data.type === "checkbox");
            question.isFILL = (data.type === "fillin");
            question.isMATCH = (data.type === "match");
            question.answer = data.correctAnswer;
            question.type = data.type;
            question.id = id;
            
            question.isFillIn = function(){
                return (question.type == 'fillin');
            }

            return question;
        }
    };
});
