(function () {
    "use strict";
    var app = angular.module('nbaBoxScore', []);
    app.controller('boxScore', function ($scope, $http) {
        var fetchResult = function () {
            var date = (new Date()).toLocaleDateString("en-US").split("/");
            var dateString = date[2] + date[0] + date[1];
            $http.get(`http://data.nba.net/data/10s/prod/v1/${dateString}/scoreboard.json`).success(function (data) {
                $scope.games = data.games;
            });
        };
        fetchResult();
    });
}());