import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import Loading from './LoadingPage'

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
        <Wrapper>
            <H1>{artist?.name}</H1>
            <Main>
                <Section1>
                    {artist !== null ? <ArtistImg src={artist?.images?.huge} /> : <Loading />}
                </Section1>
                <Section2>
                    {eventList !== null ?
                        <>
                            {eventList.map((data, index) => {
                                return (
                                    <Event key={index} onClick={() => handleClick(data?.id)}>
                                        <h4>{moment(data?.datetime_local).format("MMM D YYYY")} - {data?.title}</h4>
                                        <P>${data?.stats?.lowest_price} - {data?.venue?.name} - {data?.venue?.display_location}</P>
                                    </Event>
                                )
                            })}
                        </> : <Loading />
                    }
                </Section2>
            </Main>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 90%;
    margin: auto;
    margin-top: 80px;
`

const Main = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-top: 40px;

    @media (max-width: 900px) {
        width: 80%;
        margin: auto;
        margin-top: 40px;
        flex-direction: column;
    }
`

const H1 = styled.h1`

    @media (max-width: 900px) {
        text-align: center;
    }
`

const Section1 = styled.div`
    width: 57%;
    margin-bottom: 40px;

    @media (max-width: 900px) {
        width: 100%;
    }
`

const ArtistImg = styled.img`
width: 100%;
border-radius: 15px;
`

const Section2 = styled.div`
    width: 40%;
    height: 480px;
    overflow: scroll;
    margin-bottom: 40px;
    scroll-snap-type: y mandatory;
    overscroll-behavior-inline: contain;
    scroll-padding-top: 7px;
    margin-right: 3%;

    &::-webkit-scrollbar{
        display: none;
    }

    @media (max-width: 900px) {
        width: 100%;
    }
`

const Event = styled.div`
    margin: 30px 0px;
    padding: 3%;
    cursor: pointer;
    border-radius: 15px;
    scroll-snap-align: start;
    background-color: whitesmoke;
    
    &:hover{
        border: 1px solid silver;
    }

    &::-webkit-scrollbar{
        display: none;
    }
`

const P = styled.p`
margin-top: 10px;
`

export default ArtistDetail;