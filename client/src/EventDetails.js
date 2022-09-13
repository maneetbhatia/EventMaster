import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import GoogleMapReact from 'google-map-react';
import { SiGooglemaps } from 'react-icons/si';
import LoadingPage from "./LoadingPage";
import "./EventDetails.css";

const AnyReactComponent = (props) => {
    return <div>
        <SiGooglemaps size={30} color={"red"}/>
        <p className="tooltip">{props?.venueAddress}</p>
    </div>;

}

const EventDetails = () => {
    const [event, setEvent] =useState(null)
    const {eventID} = useParams();
    
    const API_KEY = process.env.REACT_APP_API_KEY
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
        zoom: 16
    };
    
    return (
        <>
            {event !== null ? 
            <Wrapper>
                <Main>
                    <Event>
                        <Img src={event?.performers[0]?.image} alt="event"/>
                    </Event>
                    <div>
                        <EventInfo>
                            <H2>{event.type.toUpperCase()}</H2>
                            <P>{event.title}</P>
                            {!moment(event?.datetime_local).fromNow().includes("ago") ?  
                                <P> {moment(event.datetime_local).format('MMM DD [at] hh:mm a')}</P> :
                                <P style={{fontSize: "20px",color:"red", margin: "40px 0px"}}>{"OUTDATED"}</P>
                            }
                            {!moment(event?.datetime_local).fromNow().includes("ago") && <A href={event?.url} target="_blank"> Find Tickets</A>}
                        </EventInfo>
                        <Venue>
                            <H2>Venue</H2>
                            <P>Venue: {event?.venue?.name}</P>
                            <P>Address: {event?.venue?.address+" "}
                            {event?.venue?.extended_address} {event?.venue?.country}</P>
                            <P>Time-zone: {event?.venue?.timezone}</P>
                        </Venue>
                    </div>
                </Main> 
                <MapContainer>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: API_KEY,
                            language: "en-US",
                            region: "us" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        >
                        <AnyReactComponent venueAddress = {event?.venue?.address +" "+event?.venue?.extended_address}
                            lat={event?.venue?.location?.lat}
                            lng={event?.venue?.location?.lon}
                        />
                        </GoogleMapReact>
                </MapContainer>
            </Wrapper>: 
            <LoadingPage />}
        </>
    )
};

const Wrapper = styled.div`
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-columns: 40% 60%;
    margin-top: 80px;
    grid-gap: 3%;
    margin-bottom: 30px;

    @media (max-width: 850px) {
        grid-template-columns: 100%;
    }
`

const Main = styled.div`
    @media (max-width: 850px) {
        display: block;
    }
`

const Img = styled.img`
    border-radius: 15px;
    width: 100%;

    @media (max-width: 850px) {
        width: 100%;
    }
`

const Event = styled.div`

    @media (max-width: 850px) {
        padding-right: 0;
    }
`

const EventInfo = styled.div`
    margin-top: 20px;

    @media (max-width: 850px) {
        text-align: center;
        margin-top: 20px;
    }
`

const Venue = styled.div`
    margin-top: 20px;

    @media (max-width: 850px) {
        margin-top: 40px;
        text-align: center;
    }
`

const P =styled.p`
    font-size: 18px;

    /* @media (max-width: 850px) {
        margin-top: 10px;
    }

    @media (max-width: 510px) {
        font-size: 18px;
    } */
`

const H2 =styled.h2`
    /* @media (max-width: 850px) {
        margin-top: 10px;
    }

    @media (max-width: 510px) {
        font-size: 25px;
    } */
`

const MapContainer = styled.div`
    width: 100%;
    height: 100%;

    @media (max-width: 850px) {
        height: 50vh;
        width: 90vw;
        margin-top: 10px;
        margin-bottom: 40px;
    }
`

const A = styled.a`
    color: lightcoral;
    text-decoration: none;
    border: none;
    font-size: 18px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

    &:hover{
        color: coral
    }
`

export default EventDetails;