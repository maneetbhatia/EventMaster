const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// POST EVENT IN FAVORITE-LIST COLLECTION
const addNewUser = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    let result;

    // connect to the client
    await client.connect();
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("final-project");
    console.log(req.body)
    try{
        result = await db.collection("users").insertOne({ _id: req.body._id,
            fullName: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword});

        // send error
        }catch{(err) => 
            console.log(err)
        }

     // close the connection to the database server
    client.close();
};


module.exports={addNewUser}
