const fetch = require('node-fetch');

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI, API_KEY } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const batchImport = async () => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
    let result;

  // try{

    const response = await fetch(`https://api.seatgeek.com/2/events?per_page=300&client_id=${API_KEY}`);
    const data = await response.json();

    // connect to the client
    await client.connect();
  
  //   // connect to the database (db name is provided as an argument to the function)
    const db = client.db("final-project");
    console.log("connected!");

    result = await db.collection("events").insertMany(data.events);
  // }catch (err){
  //   console.log(err)
  // }


    // close the connection to the database server
    // client.close();
    console.log("disconnected!");

    // return result;
  };
  
batchImport();

// module.exports={getEvents}