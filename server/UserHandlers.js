const { MongoClient } = require("mongodb");
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

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
    
    try{
        const isUserExist = await db.collection("users").findOne({email: req.body.email})

        if(isUserExist === null){
        const hash = await bcrypt.hashSync(req.body.password, salt);
        result = await db.collection("users").insertOne({ _id: req.body._id,
            fullName: req.body.name,
            email: req.body.email,
            password: hash,
            confirmPassword: hash
        });
    }

        // send error
        }catch{(err) => 
            console.log(err)
        }
        
        result
        ? res.status(200).json({ status: 200, message: "register Succesfull"})
        : res.status(404).json({ status: 404, message: "registration failed! "})

     // close the connection to the database server
    client.close();
};

const isValidUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    let result;

    // connect to the client
    await client.connect();
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("final-project");

    try{
        const hash = await db.collection("users").findOne({email: req.body.email})
        
        result = bcrypt.compareSync(req.body.password, hash.password);
        // send error
        }catch{(err) => 
            console.log(err)
        }

        result
        ? res.status(200).json({ status: 200, data: result.fullName,  message: "Login Succesfull" })
        : res.status(404).json({ status: 404, message: "Invalid email or password"});

     // close the connection to the database server
    client.close();
}


module.exports={addNewUser, isValidUser}
