"use strict";

quizApp.controller('ThanksCtrl', function HomeCtrl($rootScope, $scope, $location, $localStorage,$http) {
    $localStorage.$reset();
    delete $localStorage.attempt;
    delete $localStorage.username;
    delete $localStorage.currentPosition;
    window.localStorage.clear() ;
 });
