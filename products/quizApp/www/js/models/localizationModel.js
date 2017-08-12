"use strict";

quizApp.service('appLocale', function ($q, $http, $timeout) {

    var getLocaleResources = function (culture) {
        var deferred = $q.defer();
        culture = culture || 'en';
        $timeout(function () {
            $http.
                get('js/i18n/angular-locale_' + culture + '.js').
                success(function (response) {
                    eval(response);
                }).
                error(function (response) {
                });
            $http.
                get('js/i18n/' + culture + '.js').
                success(function (response) {
                    deferred.resolve(response);
                }).
                error(function (response) {
                });
        });
        return deferred.promise;
    };
    return {
        getResources: getLocaleResources
    };
});
