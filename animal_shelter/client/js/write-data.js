/*

//Submit Button

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(event) {

// $('#submit').click(function() {  //JQUERY

    //console.log("Submit Button was pressed");
    //alert("Submit Button was pressed");
    //event.preventDefault();

    var name = document.getElementById("name").value;
    var species = document.getElementById("species").value;
    var breed = document.getElementById("breed").value;
    var age = document.getElementById("age").value;
    var color = document.getElementById("color").value;
    var temperament = document.getElementById("temperament").value;
    var entryType = document.getElementById("entryType").value;

    if(!name || !species || !breed || !age || !color || !temperament || !entryType){ //TEST = if any of these fields are empty... 
        alert("Please fill in all fields before submitting");
        return;
    }

    //create JSON object to communicate input data
    var jsonObject = {
        name: name,
        species: species,
        breed: breed,
        age: age,
        color: color,
        temperament: temperament,
        entryType: entryType
    }
    
    //Send data through a FETCH
    fetch(shelterURL + "/write-record", { // /write-record is in services.js
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(jsonObject),
        
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Network Error: " + response.statusText); 
        }
        return response.json();
        
    })
    .then(data => {
        alert("Result:" + data.msg);
        if(data.msg === "SUCCESS"){
            document.getElementById("clear").click();
        }
    })

    .catch(error => {
        alert("Error: " + error);
    })

    event.preventDefault();
});

//Clear Button //JQuery example
$('#clear').click(function() {
    $('#name').val("");
    $('#species').val("");
    $('#breed').val("");
    $('#age').val("");
    $('#color').val("");
    $('#temperament').val("");
    $('#entryType').val("");

    return false;
});

*/

///////ANGULAR.JS --- ASSIGNMENT 5.2

//1.  Define angular app
var app = angular.module("addRecordsApp", []);

//2.  Create the controller and populate with the functions needed
app.controller('addRecordsCtrl', function ($scope, $http) {
    $scope.addResults = "";

    $scope.addRecord = function() {
        if($scope.name === "" || $scope.species === "" || $scope.color === "") {
            $scope.addResults = "Name, Species, and Color required";
            return;
        }

        console.log($scope.name);
        $http({
            method : "post",
            url : shelterURL + "/write-record",
            data: {
                "name": $scope.name,
                "species": $scope.species,
                "breed": $scope.breed,
                "age": $scope.age,
                "color": $scope.color,
                "temperament": $scope.temperament,
                "entryType": $scope.entryType,
            }
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.addResults = "New resident is added!";
                $scope.name = "";
                $scope.species = "";
                $scope.breed = "";
                $scope.age = "";
                $scope.color = "";
                $scope.temperament = "";
                $scope.entryType = "";
            } else {
                $scope.addResults = response.data.msg;
            }
        }, function(response) {
            alert(response);
            console.log("I failed");
        });
    };

    $scope.clearFields = function(){
        $scope.name = "";
        $scope.species = "";
        $scope.breed = "";
        $scope.age = "";
        $scope.color = "";
        $scope.temperament = "";
        $scope.entryType = "";
    }

    $scope.startNew = function() {
        $scope.addResults = "";
    };

    $scope.addResults = "";
});