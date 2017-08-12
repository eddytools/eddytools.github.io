'use strict';

quizApp.factory('quizModel', function (questionModel) {
    return {
        initialize: function (data) {
            var quizData, questionId;
            quizData = {};
            quizData.title = data.title;

            if (data.time !== null) {
                quizData.duration = data.duration;
            }

            quizData.isRandom = (data.randomized === true);
            quizData.questions = [];

            questionId = 1;

            angular.forEach(data.questions, function (q) {
                quizData.questions.push(questionModel.create(q, questionId));
                questionId = questionId + 1;
            });
            quizData.currentPage = 0;

            return quizData;
        }
    };
});
