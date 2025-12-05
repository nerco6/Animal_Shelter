//Assignment 6.1
const {MongoClient, ObjectId} = require('mongodb'); // from mongodb make mongoClient and ObjectId

//Define Database URL

const dbURL = "mongodb://127.0.0.1"; //reference to local IP

//Define the database server
const client = new MongoClient(dbURL);

//create function where database listeners will be executed 
var services = function(app){

//POST
    app.post('/write-record', async function(req, res){ //POST function
        //id removed - should now use MongoDB id
        var animalData = { //Creates a JSON string
            name: req.body.name,
            species: req.body.species,
            breed: req.body.breed,
            age: req.body.age,
            color: req.body.color,
            temperament: req.body.temperament,
            entryType: req.body.entryType
        }

          try{
            const conn = await client.connect();
            const db = conn.db("animalshelter");
            const coll = db.collection("animals");

            await coll.insertOne(animalData);

            await conn.close();
            return res.json({msg: "SUCCESS"});

        }catch(err){
            return res.json({msg:"Error: "+ err});
        }
        
    });


//GET 
    app.get("/get-records", async function(req, res){ //GET function
        try{
            const conn = await client.connect();
            const db = conn.db("animalshelter");
            const coll = db.collection("animals");

            const animals = await coll.find().toArray(); //capture data that is being collected, find() is all data (if there is something to search, then 'search' variable), .sort(orderBy) is sort, and .toArray() is to send it to an array.


            await conn.close();
            return res.json({msg: "SUCCESS", shelterData: animals}); //sends spells array to client to populate to table

        }catch(err){
            return res.json({msg: "Error: " + err});
        }
    });


//DELETE
    app.delete("/delete-record", async function(req, res){ //DELETE function
        //need to get id from request body JSON
        var id = req.body.id;
        console.log("into app.delete");
        
        //convert id string to a MongoID object
        var idAsMongoObject = ObjectId.createFromHexString(id);
        
        //create search with MongoID
        const search = {_id:idAsMongoObject};
        
        try{
            const conn = await client.connect();
            const db = conn.db("animalshelter");
            const coll = db.collection("animals");

            await coll.deleteOne(search);

            await conn.close();
            return res.json({msg: "SUCCESS"});

        }catch(err){
            return res.json({msg:"Error: "+ err});
        }
        
    });

}

module.exports = services;