/*

var dataset1 ={
    name:"Enzo",
    species:"Dog",
    breed:"German Shepherd",
    age:"2 years",
    color:"Black and Tan",
    temperament:"Nervous",
    entryType:"Surrender"
}
var dataset2 ={
    name:"Eve",
    species:"Cat",
    breed:"DSH",
    age:"6 months",
    color:"Black",
    temperament:"Friendly",
    entryType:"Born in Shelter"
}
var dataset3 ={
    name:"Alexander",
    species:"Cat",
    breed:"DSH",
    age:"1 year",
    color:"Silver Tabby",
    temperament:"Excitable",
    entryType:"Stray"
}
var dataset4 ={
    name:"Hazel",
    species:"Dog",
    breed:"Pitt/Husky Mix",
    age:"7 months",
    color:"Golden",
    temperament:"Playful",
    entryType:"Transfer"
}
var dataset5 = {
    name:"Phoebe",
    species:"Bird",
    breed:"Cockatiel",
    age:"1 year",
    color:"Piebald",
    temperament:"Quiet",
    entryType:"Surrender"
}

var jsonObject = [];
jsonObject.push(dataset1);
jsonObject.push(dataset2);
jsonObject.push(dataset3);
jsonObject.push(dataset4);
jsonObject.push(dataset5);


main();

function main() { 
    retrieveData();
}


function retrieveData(){
    //create FETCH statement - get data from the database
    fetch(shelterURL + "/get-records", { //get-records is in services
        method: "GET"
    }) 

    .then(response => {
        if(!response.ok){
            throw new Error("Network Error: " + response.statusText); 
        }
        return response.json();
    })

    .then(data => {
        if(data.msg === "SUCCESS"){
            showTable(data.shelterData);
            //showTable(jsonObject); test with hardcoded data 'jsonObject'
        }
    })

    .catch(error => {
        alert("Error: " + error);
    })
}

function showTable(shelterData){ //show table
    var htmlString = "";

    for (var i = 0; i < shelterData.length; i++){
        htmlString += "<tr>";
            htmlString += "<td>" + shelterData[i].name + "</td>";
            htmlString += "<td>" + shelterData[i].species + "</td>";
            htmlString += "<td>" + shelterData[i].breed + "</td>";
            htmlString += "<td>" + shelterData[i].age + "</td>";
            htmlString += "<td>" + shelterData[i].color + "</td>";
            htmlString += "<td>" + shelterData[i].temperament + "</td>";
            htmlString += "<td>" + shelterData[i].entryType + "</td>";
            //add inner delete button
            htmlString += "<td><button class='delete-button' data-id='" + shelterData[i]._id + "'>Remove</button></td>" 
            
        htmlString += "</tr>";
    }

    var tableBodyObj = document.getElementById("animalTable");
    

    tableBodyObj.innerHTML = htmlString;
    activateDelete();
}
///////////////////////////////// PROFESSOR'S CODE - NO EDITS//////////////////////////////////////////////////////
function activateDelete() { 
    // Capture all html items tagged with the delete-button class
    const deleteButtons = document.querySelectorAll('.delete-button');

    //Loop through all the deleteButtons and create a listener for each one
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const deleteID = this.getAttribute("data-id");  // <-- from the html button object
            //console.log(deleteID);
            handleDelete(deleteID);  //You will write this function.
        });
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleDelete(deleteID){
    //console.log("handleDelete started");
    fetch(shelterURL + "/delete-record", { // /delete-record is in services.js
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({id: deleteID}),
        
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
            retrieveData();
        }
    })

    .catch(error => {
        console.log("error");
        alert("Error: " + error);
    })
    //event.preventDefault();
}

*/

//FINAL PROJECT/////////// MAKE ANGULAR

//1. Define angular app
var app = angular.module("viewRecordsApp", []);

//2. create controller and populate with function needed
app.controller('viewRecordsController', function($scope, $http){
    $scope.animals = [];
    $scope.types = [];

    $scope.get_records = function() {
        $http({
            method : "GET",
            url : shelterURL + "/get-records"
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.animals = response.data.shelterData;
                $scope.types = getTypes(response.data.shelterData);
                $scope.selectedType = $scope.types[0];
                $scope.selectedSort = "name";
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            alert(response);
            console.log("Could not get records");
        });
    };

    $scope.redrawTable = function() {
        var type = $scope.selectedType.value;
        var sort = $scope.selectedSort;
        console.log("redraw");
        $http({
            method : "GET",
            url : shelterURL + "/get-animalsByTypeAndSort",
            params: {type: type, sort:sort}
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.animals = response.data.shelterData;
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            alert(response);
            console.log("Could not redraw table");
        });
    }

//DELETE RECORD - GOOD
    $scope.deleteRecord = function(id) {
        console.log(id);
        $http({
            method : "DELETE",
            url : shelterURL + "/delete-record",
            params: {id: id}
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.redrawTable();
            } else {
                console.log("problem" + response.data.msg);
            }
        }, function(response) {
            alert(response);
            console.log("I failed the Delete");
        });
    }

//EDIT RECORD - GOOD
    $scope.editRecord = function(index) {
        console.log(index);
        $scope.name = $scope.animals[index].name;
        $scope.species = $scope.animals[index].species;
        $scope.breed = $scope.animals[index].breed;
        $scope.age = $scope.animals[index].age;
        $scope.color = $scope.animals[index].color;
        $scope.temperament = $scope.animals[index].temperament;
        $scope.entryType = $scope.animals[index].entryType;
        $scope.id = $scope.animals[index]['_id'];

        console.log("Animal ID set: " + $scope.id);
        $scope.hideTable = true;
        $scope.hideForm = false;
    }
//CANCEL UPDATE - GOOD
	$scope.cancelUpdate = function() {
		$scope.hideForm = true;
		$scope.hideTable = false;

	}
//UPDATE RECORD - GOOD
    $scope.updateRecord = function() {
        if($scope.name === "" || $scope.species === "" || $scope.color === "") {
            $scope.addResults = "Name, Species, and Color required";
            return;
        }

        console.log("Animal ID check: " + $scope.id);

        $http({
            method : "PUT",
             url : shelterURL + "/update-record",
             data: {
                "id": $scope.id,
                "name": $scope.name,
                "species": $scope.species,
                "breed": $scope.breed,
                "age": $scope.age,
                "color": $scope.color,
                "temperament": $scope.temperament,
                "entryType": $scope.entryType
            }
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.hideForm = true;
                $scope.hideTable = false;

                $scope.redrawTable();
                
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

    }

    $scope.get_records();
});

//A handy function we will use to get the list of types
function getTypes(shelterTableData) {
    var typeExists;  //This is used to prevent duplicates

    typesArray = [{value:"", display:"ALL"}];
	
	//Loop through the JSON array returned from the server
    for(var i=0; i<shelterTableData.length; i++) {
		//Check to see if the type in the ith record has already been captured
        typeExists = typesArray.find(function(element) {
            return element.value.toUpperCase() === shelterTableData[i].species.toUpperCase();
        })    
        if(typeExists) {
            continue;  //If already captured, move on to next element
        } else {
			//If not captured, add the type and uppercase type to the types array
            typesArray.push({value: shelterTableData[i].species, display: shelterTableData[i].species});
        }
    }

    return typesArray
}

