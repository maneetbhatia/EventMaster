import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import GoogleMapReact from 'google-map-react';
import { SiGooglemaps } from 'react-icons/si';

const AnyReactComponent = ({ text }) => <div>{<SiGooglemaps size={30}/>}</div>;

const EventDetails = () => {
    const [event, setEvent] =useState(null)
    const {eventID} = useParams();
    
    useEffect(() => {
        fetch(`/event/id/${eventID}`)
            .then((res) => res.json())
            .then((data) => {
                setEvent(data.data.events[0])
            }).catch((err) => {
                console.log("error", err);
        }) 
    }, []);

    console.log(event?.venue)

    const defaultProps = {
        center: {
            lat: event?.venue?.location?.lat,
            lng: event?.venue?.location?.lon
        },
        zoom: 11
    };

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
            <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCxJEsl_5nBTaCJoXmHLgsdsLy-lzpgacE",
            language: "en-US",
            region: "us" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                lat={event?.venue?.location?.lat}
                lng={event?.venue?.location?.lon}
                text="EVENT"
                />
            </GoogleMapReact>
        </div>
        </MapContainer>
        </div>: 
        <p>Loading...</p>}

        </>
    )
};

const Main = styled.div`
background-color: ghostwhite;
width: 75%;
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
width: 80%;
margin: auto;
margin-bottom: 40px;
`

export default EventDetails;