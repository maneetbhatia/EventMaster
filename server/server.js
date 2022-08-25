"use strict";

const express =  require("express");
const morgan = require("morgan");
const {getTaxonomies, 
    getEventByCategory, 
    getEventByID, 
    getEventsRecommendation, 
    getArtistByID,
    getArtistEventsList,
    getSearchValue} = require('./GetEvents')


const PORT = process.env.PORT || 8000;

express()
    .use(morgan("tiny"))
    .use(express.static("public"))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))

// ```````````````EVENTS ENDPOINTS``````````````````
// get events
.get("/taxonomies", getTaxonomies)

// get event by category
.get("/event/category/:type", getEventByCategory)

// get event by id
.get("/event/id/:id", getEventByID)

// get event by id
.get("/event/recommendations", getEventsRecommendation)

// get artist by id
.get("/artist/id/:id", getArtistByID)

// get artist by id
.get("/artist/events/:artistName", getArtistEventsList)

// get search value
.get("/search/:searchValue", getSearchValue)


// handle 404s
    .use((req, res) => res.status(404).type("txt").send("🤷‍♂️ Invalid Url"))

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
