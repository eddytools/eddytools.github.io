"use strict";

quizApp.controller('ThemeCtrl', function HomeCtrl($rootScope, $scope) {
    $scope.theme = 'light';
    $scope.changeTheme = function(themeName) {
        $scope.theme = themeName;
    }
});
