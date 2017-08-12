'use strict';

quizApp.factory('userModel', function () {
    return {
        initialize: function (username,password) {
            var user = {};
            user.username = username;
            user.password = password;
            user.correct = 0;
            user.score = 0;
            return user;
        }
    };
});