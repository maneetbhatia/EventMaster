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

const getEventsRecommendation = async (req, res) => {
  
  let result;

  try{
    const response = await fetch(`https://api.seatgeek.com/2/recommendations/performers?per_page=4&client_id=${API_KEY}`);
    result = await response.json();
  }catch (err){
    console.log(err)
  }

  if(result === null){
    res.status(404).send({
        status: 404,
        message: "No recommendations found"
    })
}else{
    res.status(200).send({
        status: 200,
        data: result
    })
}

};

const getArtistByID = async (req, res) => {
  const id = Number(req.params.id)
  
  let result;


  try{
    const response = await fetch(`https://api.seatgeek.com/2/performers/${id}?client_id=${API_KEY}`);
    result = await response.json();
  }catch (err){
    console.log(err)
  }

  if(result === null){
    res.status(404).send({
        status: 404,
        message: "Invalid artist id"
    })
  }else{
      res.status(200).send({
          status: 200,
          data: result
      })
  }

};

const getArtistEventsList = async (req, res) => {
  const artistName = req.params.artistName;
  let updatedArtistName = "";
  let result;
  
    if(artistName !== ""){
      updatedArtistName = artistName.split(" ").join("+");

      const response = await fetch(`https://api.seatgeek.com/2/events?q=${updatedArtistName}&client_id=${API_KEY}`);
      result = await response.json();
    }

  if(result === null){
    res.status(404).send({
        status: 404,
        message: "Invalid artist id"
    })
  }else{
      res.status(200).send({
          status: 200,
          data: result
      })
  }

};
  
module.exports = {getEvents, getEventByCategory, getEventByID, getEventsRecommendation, getArtistByID, getArtistEventsList}