(function () {
    "use strict";
    var app = angular.module('BoxScore', []);
    app.controller('nbaBoxScore', function ($scope, $http, $interval) {
        var fetchResult = function () {
            var date = (new Date()).toLocaleDateString("en-US").split("/");
            var dateString = date[2] + date[0] + date[1];
            $http.get(`http://data.nba.net/data/10s/prod/v1/${dateString}/scoreboard.json`).success(function (data) {
                $scope.games = data.games;
                $scope.games.forEach(function (game) {
                    game.vTeam.img = `http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${game.vTeam.triCode}.svg`;
                    game.hTeam.img = `http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${game.hTeam.triCode}.svg`;
                });
            });
        };
        fetchResult();
        var timer = $interval(fetchResult, 3000);
        $scope.$on("$destroy", function () {
            $interval.cancel(timer);
            timer = undefined;
        });
    });
    app.controller('nflBoxScore', function ($scope, $http, $interval) {
        var fetchResult = function () {
            var date = (new Date()).toLocaleDateString("en-US").split("/");
            var dateString = date[2] + date[0] + date[1];
            $http.get(`http://www.nfl.com/liveupdate/scores/scores.json`).success(function (data) {
                $scope.games = data;
            });
        };
        fetchResult();
        var timer = $interval(fetchResult, 3000);
        $scope.$on("$destroy", function(){
            $interval.cancel(timer);
            timer = undefined;
        });
    });
}());