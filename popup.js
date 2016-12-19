(function () {
    "use strict";
    var app = angular.module('BoxScore', []);
    app.controller('nbaBoxScore', function ($scope, $http, $interval) {
        var fetchResult = function () {
            var date = (new Date()).toLocaleDateString("en-US").split("/");
            var dateString = date[2] + date[0] + date[1];
            $http.get(`http://data.nba.net/data/10s/prod/v1/${dateString}/scoreboard.json`).success(function (data) {
                $scope.games = data.games.map(function (game) {
                    var clock = null;
                    if (game.hTeam.linescore.length == 0) {
                        clock = "--";
                    } else if (game.period.isEndOfPeriod && game.period.isHalftime) {
                        clock = "Half Time";
                    } else if (game.clock.length || game.period.isEndOfPeriod) {
                        clock = `Quarter ${game.period.current} - ${game.clock}`;
                    } else {
                        clock = "End of Game";
                    }
                    // Checking OTs
                    var vScores = [];
                    var hScores = [];
                    for (var i = 0; i < game.vTeam.linescore.length; i++){
                        if (i > 4) {
                            vScores[4] += parseInt(game.vTeam.linescore[i].score);
                            hScores[4] += parseInt(game.hTeam.linescore[i].score);
                        } else {
                            vScores.push(parseInt(game.vTeam.linescore[i].score));
                            hScores.push(parseInt(game.hTeam.linescore[i].score));
                        }
                    }
                    game.vTeam.linescore = vScores;
                    game.hTeam.linescore = hScores;
                    game.vTeam.img = `http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${game.vTeam.triCode}.svg`;
                    game.hTeam.img = `http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${game.hTeam.triCode}.svg`;
                    return {
                        vTeam: game.vTeam,
                        hTeam: game.hTeam,
                        clock: clock
                    }
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
    app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    window.location.href=attrs.ngEnter;
                }
            });
        };
    });
}());