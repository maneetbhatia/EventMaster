"use strict";

const express =  require("express");
const morgan = require("morgan");
const {getTaxonomies, 
    getEventByCategory, 
    getEventByID, 
    getEventsRecommendation, 
    getArtistByID,
    getArtistEventsList,
    getSearchValue,
    getVenues} = require('./GetEvents')

const {addedNewEvent, getFavoriteList, deleteEvent, GetEventFromFavorites}  = require('./FavoriteListHandlers')
const {addNewUser, isValidUser} = require('./UserHandlers')

const PORT = process.env.PORT || 8000;

express()
    .use(morgan("tiny"))
    .use(express.static("public"))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))

// ```````````````EVENTS ENDPOINTS``````````````````
// get taxonomies
.get("/taxonomies", getTaxonomies)

// get event by category
.get("/event/category/:type/:pageCount", getEventByCategory)

// get event by id
.get("/event/id/:id", getEventByID)

// get event recommendations
.get("/event/recommendations", getEventsRecommendation)

// get artist by id
.get("/artist/id/:id", getArtistByID)

// get artist by name
.get("/artist/events/:artistName", getArtistEventsList)

// get search value
.get("/search/:searchValue/:pageCount", getSearchValue)

// get venues
.get("/venues", getVenues)

//~~~~~~~~~~~~~~~~~~~~~FAVORITE LIST~~~~~~~~~~~~~~~~~~~~~~
// get events from favorite list
.get("/events", getFavoriteList)

// get event from favorite list
.get("/favorite/event/:id", GetEventFromFavorites)

// post event to favorite list
.post("/event", addedNewEvent)

// delete event from favorite list
.delete("/favorite/event/:id", deleteEvent)

//~~~~~~~~~~~~~~~~~~~~~~~~~~USERS~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// add new user to users database
.post("/users", addNewUser)

// Check if user have account
.post("/user", isValidUser)

// handle 404s
    .use((req, res) => res.status(404).type("txt").send("🤷‍♂️ Invalid Url"))

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
