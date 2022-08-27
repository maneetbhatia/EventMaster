import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import mapImg from './Assests/5d0f4ffc9c6546dda58e65c348d753b0.jpg'

const EventDetails = () => {
    const [event, setEvent] =useState(null)
    const {eventID} = useParams();
    
    useEffect(() => {
        fetch(`/event/id/${eventID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data.events[0]);
                setEvent(data.data.events[0])
            }).catch((err) => {
                console.log("error", err);
        }) 
    }, []);


    // const map = new Map({
    //     layers: [
    //       new TileLayer({
    //         source: new OSM(),
    //       }),
    //     ],
    //     target: 'map',
    //     view: new View({
    //       center: [0, 0],
    //       zoom: 2,
    //     }),
    //   });
      
    //   console.log(map)

    return (
        <>
        {event !== null ? 
        <div>
        <Main>
            <Event>
                <Img src={event?.performers[0]?.image} alt="event"/>
            </Event>
            <div>
            <EventInfo>
                <h2>{event.type}</h2>
                <p>{event.title}</p>
                <p> {moment(event.datetime_local).format('MMM DD')}</p>
                {event?.stats?.lowest_price !== null ? 
                <p>From: ${event?.stats?.lowest_price}</p> : 
                <p>Find tickets </p>}
            </EventInfo>
            <Venue>
                <h2>Venue</h2>
                <p>Venue: {event.venue.name}</p>
                <p>Address: {event.venue.address+" "}
                {event.venue.extended_address} {event.venue.country}</p>
                <p>Time-zone: {event.venue.timezone}</p>
            </Venue>
            </div>
        </Main> 
        <MapContainer>
            <div>{"map"}</div>
        </MapContainer>
        </div>: 
        <p>Loading...</p>}

        </>
    )
};

const Main = styled.div`
background-color: ghostwhite;
width: 70%;
margin: auto;
padding: 1.5%;
margin-top: 40px;
box-shadow: 1px 1px 10px 1px #888888;
border-radius: 15px;
display: flex;
margin-bottom: 30px;
`

const Img = styled.img`
border-radius: 15px;
`

const Event = styled.div`
float: left;
padding-right: 2%;
`

const EventInfo = styled.div`
margin-top: 10px;
`

const Venue = styled.div`
margin-top: 10px;
`

const MapContainer = styled.div`
text-align: center;
margin-bottom: 30px;
width: 100%;
`

const MapImg = styled.img`
border-radius: 15px;
width: 700px;
`

export default EventDetails;