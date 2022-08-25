const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addedNewEvent = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    let result;

    // connect to the client
    await client.connect();
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("final-project");
    const event = req.body;
    console.log(event)
    try{
        result = await db.collection("favorite-list").insertOne({
            events: event,
        });

        // send error
        }catch{(err) => 
            console.log(err)
        }

     // close the connection to the database server
    client.close();
    return result;
};

module.exports={addedNewEvent}