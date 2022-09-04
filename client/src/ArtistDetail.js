import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

const ArtistDetail = () => {
    const [artist, setArtist] =useState(null)
    const [eventList, setEventList] = useState(null)
    const {artistID} = useParams();
    
    useEffect(() => {
        fetch(`/artist/id/${artistID}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.data);
                setArtist(data.data)
            }).catch((err) => {
                console.log("error", err);
        }) 
    }, [])

    let artistName = "";
    useEffect(() => {
        if(artist !== null){
            artistName=artist?.name
        
            // console.log(artistName)
            
                fetch(`/artist/events/${artistName}`)
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data.data.events);
                        setEventList(data.data.events)
                    }).catch((err) => {
                        console.log("error", err);
                })
        }
    }, [artist]);

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/event/id/${id}`)
    }

    return (
        <>
            <H1>{artist?.name}</H1>
            <Main>
                <Section2>
                    {eventList !== null ?
                        <>
                            {eventList.map((data, index) => {
                                return (
                                    <Event key={index} onClick={() => handleClick(data?.id)}>
                                        <h4>{moment(data?.datetime_local).format("MMM D YYYY")} - {data?.title}</h4>
                                        <p>${data?.stats?.lowest_price} - {data?.venue?.name} - {data?.venue?.display_location}</p>
                                    </Event>
                                )
                            })}
                        </> : <p>Loading...</p>
                    }
                </Section2>
                <Section1>
                    {artist !== null ? <ArtistImg src={artist?.images?.huge} /> : <p>Loading...</p>}
                </Section1>
            </Main>
        </>
    )
}

const Main = styled.div`
display: flex;
width: 90%;
margin: auto;
margin-top: 40px;
`

const H1 = styled.h1`
width: fit-content;
margin: 40px 0px 0px 90px;
`

const Section1 = styled.div`
float: right;
width: 60%;
object-fit: cover;
margin-bottom: 40px;
`

const ArtistImg = styled.img`
width: 100%;
border-radius: 15px;
`

const Section2 = styled.div`
float: left;
width: 40%;
margin-right: 4%;
height: 470px;
overflow: scroll;
padding: 0px 20px;
margin-bottom: 40px;
scroll-snap-type: y mandatory;
overscroll-behavior-inline: contain;
scroll-padding-top: 7px;

&::-webkit-scrollbar{
    display: none;
}
`

const Event = styled.div`
    margin: 30px 0px;
    padding: 3.5%;
    cursor: pointer;
    border-radius: 15px;
    box-shadow: 1px 1px 10px 1px #888888;
    scroll-snap-align: start;

    &:hover{
        margin-left: 1.5%;
    }

    &::-webkit-scrollbar{
    display: none;
}
`

export default ArtistDetail;