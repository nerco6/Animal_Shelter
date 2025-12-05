

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