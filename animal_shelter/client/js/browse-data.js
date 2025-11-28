//Some variables we will need
var animals = [];
var activeRecord = 0;

//1.  Define angular app
var app = angular.module("browseRecordsApp", []);

//2.  Create the controller and populate with the functions needed
app.controller('browseRecordsCtrl', function($scope, $http){

    $scope.get_records = function() {
        $http({
            method: "GET",
            url: shelterURL + "/get-records"
        }).then(function(response) {
            //this is where we go if we connect
            if(response.data.msg === "SUCCESS") {
                animals = response.data.shelterData;
                $scope.obj = animals[activeRecord];
                $scope.showHide();
            }
        }, function(error) {
            alert(error);  //If we cannot connect to server
        });
    }

    $scope.get_records();

    $scope.changeRecord = function(direction) {
        activeRecord += direction;
        $scope.obj = animals[activeRecord];
        $scope.showHide();
    };

    $scope.showHide = function() {
        $scope.hidePrev = (activeRecord === 0) ? true : false;
        $scope.hideNext = (activeRecord === animals.length-1) ? true : false;
    }
});