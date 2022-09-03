import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import GoogleMapReact from 'google-map-react';
import { SiGooglemaps } from 'react-icons/si';
import LoadingPage from "./LoadingPage";

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

    const defaultProps = {
        center: {
            lat: event?.venue?.location?.lat,
            lng: event?.venue?.location?.lon
        },
        zoom: 13
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
                <H2>{event.type.toUpperCase()}</H2>
                <P>{event.title}</P>
                <P> {moment(event.datetime_local).format('MMM DD [at] hh:mm a')}</P>
                {event?.stats?.lowest_price !== null ? 
                <P>From: ${event?.stats?.lowest_price}</P> : 
                <P>Find tickets </P>}
            </EventInfo>
            <Venue>
                <H2>Venue</H2>
                <P>Venue: {event.venue.name}</P>
                <P>Address: {event.venue.address+" "}
                {event.venue.extended_address} {event.venue.country}</P>
                <P>Time-zone: {event.venue.timezone}</P>
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
        <LoadingPage />}

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

@media (max-width: 850px) {
    display: block;
}
`

const Img = styled.img`
border-radius: 15px;
@media (max-width: 850px) {
    width: 100%;
}
`

const Event = styled.div`
padding-right: 2%;

@media (max-width: 850px) {
    padding-right: 0;
}
`

const EventInfo = styled.div`
margin-top: 10px;

@media (max-width: 850px) {
    text-align: center;
    font-size: 20px;
    margin-top: 20px;
}
`

const Venue = styled.div`
margin-top: 10px;

@media (max-width: 850px) {
    margin-top: 40px;
    text-align: center;
    font-size: 20px;
}
`

const P =styled.p`
@media (max-width: 850px) {
margin-top: 10px;
}

@media (max-width: 510px) {
   font-size: 18px;
}
`

const EventAddress = styled.div`
background-color: red;
`

const H2 =styled.h2`
@media (max-width: 850px) {
margin-top: 10px;
}

@media (max-width: 510px) {
   font-size: 25px;
}
`

const MapContainer = styled.div`
width: 80%;
margin: auto;
margin-bottom: 40px;
`

export default EventDetails;