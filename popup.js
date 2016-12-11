(function () {
    "use strict";
    var app = angular.module('nbaBoxScore', []);
    app.controller('boxScore', function ($scope, $http, $interval) {
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
}());