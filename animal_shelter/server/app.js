// STEP 1 - CREATE THE SERVER

//brings over from node modules and set as variables
const express = require('express');
const cors = require('cors');
const path = require('path'); //manage folder structure
const bodyParser = require('body-parser');

const app = express(); //take express package and execute express method and placing in 'app' object

//tell app to execute cors
app.use(cors());

//puts security around cors - prevents cors errors
app.use(function(req,res,next){//request, response, next
    res.header('Access-Control-Allow-Origin', '*'); // '*' means anyone can come use it
    next();
}); 

//define JSON using body-parse
app.use(bodyParser.json()); // saying we are using json inside our server
app.use(bodyParser.urlencoded({extended: false}));//make sure it's using the right json

//define alias that webpage can use to go directly to client folder
app.use("/client", express.static(path.resolve(__dirname + "/../client/"))); //for user side

//define a port 
const port = 5000;


///////////Page listeners (our router)
var router = require('./router.js'); //'./' means current folder
//send it
router(app);

///////////Service listeners (our data processes)
var services = require('./services.js');
//bring it into app
services(app);


//Listen - start server
var server = app.listen(port, function(err) {
    if(err) throw err;

    console.log("Listening on port: " + port);
});


///// in Cmd Prompt terminal, cd to animal_shelter folder and then type in node server/app.js and then Enter to run