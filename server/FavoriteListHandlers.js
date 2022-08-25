const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// POST EVENT IN FAVORITE-LIST COLLECTION
const getFavoriteList = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    let result;

    // connect to the client
    await client.connect();
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("final-project");
    
   
        result = await db.collection("favorite-list").find().toArray();

    result !== null ?
        res.status(200).send({status: 200, data: result})
        : res.status(404).send({status: 404, message: "no events found"})
        

     // close the connection to the database server
    client.close();
    return result;
};

// POST EVENT IN FAVORITE-LIST COLLECTION
const addedNewEvent = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    let result;

    // connect to the client
    await client.connect();
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("final-project");
    
    try{
        result = await db.collection("favorite-list").insertOne({ _id: req.body._id,
            title: req.body.title,
            venue: req.body.venue,
            image: req.body.image,
            ticket: req.body.ticket});

        // send error
        }catch{(err) => 
            console.log(err)
        }

     // close the connection to the database server
    client.close();
    return result;
};

module.exports={addedNewEvent, getFavoriteList}