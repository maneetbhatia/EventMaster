const { MongoClient } = require("mongodb");
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addNewUser = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    let result;

    await client.connect();
    
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
    }catch{(err) => 
        console.log(err)
    }
        
        result
        ? res.status(200).json({ status: 200, message: "register Succesfull"})
        : res.status(404).json({ status: 404, message: "registration failed! "})

    client.close();
};

const isValidUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    let result;

    await client.connect();
    const db = client.db("final-project");

    try{
        const hash = await db.collection("users").findOne({email: req.body.email})
        
        result = bcrypt.compareSync(req.body.password, hash.password);
        
        }catch{(err) => 
            console.log(err)
        }

        result
        ? res.status(200).json({ status: 200, data: result.fullName,  message: "Login Succesfull" })
        : res.status(404).json({ status: 404, message: "Invalid email or password"});

    client.close();
}


module.exports={addNewUser, isValidUser}
