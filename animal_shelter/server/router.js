// STEP 2

const path = require('path');


//Function to hold all our page listeners

var router = function(app) { //app does not have anything to do with app.js. different memory spaces, could be Fred
    //where action happens for our listeners - directs to each of our pages
    app.get('/', function(req, res){ /// '/' directs to the landing page.
        //sending back landing page
        res.sendFile(path.join(__dirname + "/../client/animal_shelter.html")); //__dirname is where we are now
    });
    app.get('/view-data', function(req, res){ /// '/' directs to the view-data page.
        //sending back landing page
        res.sendFile(path.join(__dirname + "/../client/view-data.html")); 
    });
    app.get('/write-data', function(req, res){ /// '/' directs to the write-data page.
        //sending back landing page
        res.sendFile(path.join(__dirname + "/../client/write-data.html")); 
    });
}

//Export from here and Import into our app.js = imported via app.js file under Page Listeners
//Export function
module.exports = router;