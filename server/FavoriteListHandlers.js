const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const GetEventFromFavorites = async (req, res) => {
    const _id = Number(req.params.id);
    
    const client = new MongoClient(MONGO_URI, options);
    
    let result;
    try{
        await client.connect();
    
        const db = client.db("final-project");
        result = await db.collection("favorite-list").findOne({ _id });
    }catch (err){
        console.log(err.errmsg);
    }
    
        result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, message: "ID Not Found" });
    
        client.close();
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


const deleteEvent = async (req, res) => {
    const _id = Number(req.params.id);

    console.log(_id)

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("final-project");
    const result = await db.collection("favorite-list").deleteOne({ "_id": _id });
    
    if(result.deletedCount >= 1){
        res.status(200).json({ status: 200, result, message:"event deleted" })
    }else{
        res.status(404).json({ status: 404, _id, message: "Event ID Not Found" });
    }

    client.close();
};

module.exports={addedNewEvent, getFavoriteList, deleteEvent, GetEventFromFavorites}