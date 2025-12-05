//STEP 3

//Save data that saves to a file // this file will eventually talk to our MongoDB

const fs = require('fs');
const path = require('path');
const database_file = path.join(__dirname + "/files/data.txt");

//create function where database listeners will be executed 
var services = function(app){

//POST
    app.post('/write-record', function(req, res){ //POST function
        var id = "ani" + Date.now(); //gives ID based off of date/time

        var animalData = { //Creates a JSON string
            id: id,
            name: req.body.name,
            species: req.body.species,
            breed: req.body.breed,
            age: req.body.age,
            color: req.body.color,
            temperament: req.body.temperament,
            entryType: req.body.entryType
        }

        //put into an array, because there should be many entries
        //create empty array
        var shelterData = []; //will be an array of JSON objects

        if(fs.existsSync(database_file)) { // if this statement is true, the file exists and we can update it
            //READ current data
            fs.readFile(database_file, "utf8", function(err, data){
                if(err){ //if an error, send back a message to the client
                    res.send(JSON.stringify({msg: err})); //whatever error comes back, the error gets sent as a message to the client
                }else{
                    shelterData = JSON.parse(data); //parse the received data
                    
                    shelterData.push(animalData); //shelter data is being given the new animal data to add to the shelter

                    //WRITE the data to the file
                    fs.writeFile(database_file, JSON.stringify(shelterData), function(err){ //stringify the data and send it to the file
                        if(err){
                            res.send(JSON.stringify({msg: err}));
                        }else{
                            res.send(JSON.stringify({msg:"SUCCESS"}));
                        }
                    });
                }
            });
        }else{ //Means no file exists yet
            shelterData.push(animalData);

            //since no file exists already, there is nothing to read, 

            //WRITE file
            fs.writeFile(database_file, JSON.stringify(shelterData), function(err){ //stringify the data and send it to the file
                if(err){
                    res.send(JSON.stringify({msg: "Error: " + err}));
                }else{
                    res.send(JSON.stringify({msg: "SUCCESS"}));
                }
            });
        }
    });


//GET 
    app.get("/get-records", function(req, res){ //GET function
        if(fs.existsSync(database_file)){// if it exists
            fs.readFile(database_file, "utf8", function(err, data){
                if(err){ //test for error
                    res.json({msg: err});
                }else{
                    shelterData = JSON.parse(data); //get data from txt file (json string) and turning it into a JSON object

                    res.json({msg: "SUCCESS", shelterData: shelterData}); //LEFT IS JSON OBJECT NAME REFERENCED ON CLIENT SIDE : RIGHT SIDE IS VALUES (WHAT WAS JUST PARSED IN THE LINE ABOVE)
                }
            })
        }else{ // if it doesn't exist
            shelterData = [];
            res.json({msg: "SUCCESS", shelterData: shelterData}); //will send back an empty array - prevents us from opening a file that does not exist
        }
    });


//DELETE
    app.delete("/delete-record", function(req, res){ //DELETE function
        //need to get id from request body JSON
        var id = req.body.id;
        console.log("into app.delete");
        //SEE IF FILE EXISTS
       
        if(fs.existsSync(database_file)) { // if this statement is true, the file exists and we can update it
            //READ current data
            fs.readFile(database_file, "utf8", function(err, data){
                if(err){ //if an error, send back a message to the client
                    res.send(JSON.stringify({msg: err})); //whatever error comes back, the error gets sent as a message to the client
                }else{
                    shelterData = JSON.parse(data); //parse the received data
                    
                    //Loops through the data array to find the array index which contains the delete id.
                    for (var index = 0; index < shelterData.length; index++){
                        if (shelterData[index].id == id){
                            //remove record from array
                            shelterData.splice(index,1);
                        }
                    }
                    //WRITE the updated data to the file
                    fs.writeFile(database_file, JSON.stringify(shelterData), function(err){ //stringify the data and send it to the file
                        if(err){
                            res.send(JSON.stringify({msg: err}));
                        }else{
                            res.send(JSON.stringify({msg:"SUCCESS"}));
                        }
                    });
                }
            });
        }else{ //Means no file exists yet
            res.send(JSON.stringify({msg: "No Existing Database"}));

            //since no file exists already, there is nothing to read, 

            //WRITE file
            fs.writeFile(database_file, JSON.stringify(shelterData), function(err){ //stringify the data and send it to the file
                if(err){
                    res.send(JSON.stringify({msg: "Error: " + err}));
                }else{
                    res.send(JSON.stringify({msg: "SUCCESS"}));
                }
            });
        }
    });

}

module.exports = services;