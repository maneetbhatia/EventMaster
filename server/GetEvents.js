const fetch = require('node-fetch');

require("dotenv").config();
const { API_KEY } = process.env;

const getEvents = async (req, res) => {
    let result;

  try{
    const response = await fetch(`https://api.seatgeek.com/2/events?per_page=30&client_id=${API_KEY}`);
    result = await response.json();
  }catch (err){
    console.log(err)
  }

  if(result === null){
    res.status(404).send({
        status: 404,
        message: "no events found"
    })
  }else{
    res.status(200).send({
        status: 200,
        data: result
    })
  }

};

const getEventByCategory = async (req, res) => {
  const type = req.params.type;
  let result;
  

  try{
    const response = await fetch(`https://api.seatgeek.com/2/events?taxonomies.name=${type}&client_id=${API_KEY}`);
    result = await response.json();
  }catch (err){
    console.log(err)
  }
  
  if(result === null){
    res.status(404).send({
        status: 404,
        message: "Invalid type"
    })
}else{
    res.status(200).send({
        status: 200,
        data: result
    })
}
};


const getEventByID = async (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  
  let result;


  try{
    const response = await fetch(`https://api.seatgeek.com/2/events/?id=${id}&client_id=${API_KEY}`);
    result = await response.json();
  }catch (err){
    console.log(err)
  }

  if(result === null){
    res.status(404).send({
        status: 404,
        message: "Invalid event id"
    })
}else{
    res.status(200).send({
        status: 200,
        data: result
    })
}

};
  
module.exports = {getEvents, getEventByCategory, getEventByID}