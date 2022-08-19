"use strict";

const express =  require("express");
const morgan = require("morgan");
const {getEvents, getEventByCategory} =  require("./EventHandlers.js");


const PORT = process.env.PORT || 8000;

express()
    .use(morgan("tiny"))
    .use(express.static("public"))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))

// ```````````````EVENTS ENDPOINTS``````````````````
// get events
.get("/events", getEvents)

// getEventByCategory
.get("/event/:id", getEventByCategory)


// handle 404s
    .use((req, res) => res.status(404).type("txt").send("🤷‍♂️ Invalid Url"))

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
