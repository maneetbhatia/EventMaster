const fetch = require('node-fetch');

require("dotenv").config();
const { API_KEY } = process.env;

const getTaxonomies = async (req, res) => {
    let result;

  try{
    const response = await fetch(`https://api.seatgeek.com/2/taxonomies?client_id=${API_KEY}`);
    result = await response.json();
  }catch (err){
    console.log(err)
  }

  if(result === null){
    res.status(404).send({
        status: 404,
        message: "no taxonomies found"
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

const getSearchValue = async (req, res) => {
  const searchValue = req.params.searchValue;
  let updatedSearchValue = "";
  let result;

  console.log(searchValue)
  
    if(searchValue !== ""){
      updatedSearchValue = searchValue.split(" ").join("+");

      const response = await fetch(`https://api.seatgeek.com/2/events?q=${updatedSearchValue}&client_id=${API_KEY}`);
      result = await response.json();
    }

  if(result.events.length === 0){
    res.status(404).send({
        status: 404,
        message: "No events found, search something else"
    })
  }else{
      res.status(200).send({
          status: 200,
          data: result
      })
  }

};
  
module.exports = {getSearchValue, getTaxonomies, getEventByCategory, getEventByID, getEventsRecommendation, getArtistByID, getArtistEventsList}