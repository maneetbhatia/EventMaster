const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getEvents = async (req, res) => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
  
    // connect to the client
    await client.connect();
  
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("final-project");

    const events = await db.collection("events").find().toArray();
    
    if(!events){
      res.status(404).send({
          status: 404,
          message: "events not found"
      })
  }else{
      res.status(200).send({
          status: 200,
          data: events
      })
  }

    // close the connection to the database server
    client.close();
  };

  const getEventByCategory = async (req, res) => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
    const type = req.params.type
    
    // connect to the client
    await client.connect();
    
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("final-project");
    
    const event = await db.collection("events").find({"type" : type}).toArray();

    if(event.length === 0){
      res.status(404).send({
          status: 404,
          message: "Invalid type"
      })
  }else{
      res.status(200).send({
          status: 200,
          data: event
      })
  }

    // close the connection to the database server
    client.close();
  };


  const getEventByID = async (req, res) => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
    const id = Number(req.params.id)
    console.log(id)
    // connect to the client
    await client.connect();
    
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("final-project");
    
    const event = await db.collection("events").findOne({"id": id});

    if(event === null){
      res.status(404).send({
          status: 404,
          message: "Invalid id"
      })
  }else{
      res.status(200).send({
          status: 200,
          data: event
      })
  }

    // close the connection to the database server
    client.close();
  };

module.exports = {getEvents, getEventByCategory, getEventByID}