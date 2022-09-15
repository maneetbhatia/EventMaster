const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const GetEventFromFavorites = async (req, res) => {
    const _id = Number(req.params.id);
    
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


const getFavoriteList = async(req, res) => {
    let result;

    await client.connect();
    
    const db = client.db("final-project");
    
    result = await db.collection("favorite-list").find().toArray();

    result.length > 0
        ? res.status(200).send({status: 200, data: result})
        : res.status(404).send({status: 404, message: "There are no events in your favorite list"})
        

    client.close();
};


const addedNewEvent = async(req, res) => {
    let result;

    await client.connect();

    const db = client.db("final-project");

    try{
        result = await db.collection("favorite-list").insertOne({ eventId: req.body._id,
            title: req.body.title,
            venue: req.body.venue,
            image: req.body.image,
            ticket: req.body.ticket,
            isFavorite: true
        });

        }catch{(err) => 
            console.log("err", err)
        }

        if(result){
            res.status(200).json({ status: 200, result, message:"Added to Favorite List" })
        }else{
            res.status(404).json({ status: 404, message: "not added to fav list" });
        }

    client.close();
};


const deleteEvent = async (req, res) => {
    const _id = Number(req.params.id)

    await client.connect();

    const db = client.db("final-project");
    const result = await db.collection("favorite-list").deleteOne({ eventId: _id });
    
    if(result.deletedCount >= 1){
        res.status(200).json({ status: 200, result, message:"event deleted" })
    }else{
        res.status(404).json({ status: 404, _id, message: "Event ID Not Found" });
    }

    client.close();
};

module.exports={addedNewEvent, getFavoriteList, deleteEvent, GetEventFromFavorites}