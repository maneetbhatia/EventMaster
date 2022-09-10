import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import Loading from './LoadingPage';
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';

const ArtistDetail = () => {
    const [artist, setArtist] =useState(null)
    const [eventList, setEventList] = useState(null)
    const {artistID} = useParams();

    const ref = useRef(null);
    const navigate = useNavigate();

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


    const handleClick = (id) => {
        navigate(`/event/id/${id}`)
    }

    const scrollLeft = () => {
        console.log(ref.current.scrollTop)
        ref.current.scrollTop = ref.current.scrollTop - 100;
    };

    const scrollRight = () => {
        ref.current.scrollTop = ref.current.scrollTop + 100;
    };

    return (
        <>
        {eventList !== null  && artist !== null ?
        <Wrapper>
            <H1>{artist?.name}</H1>
            <Main>
                <Section1>
                    <ArtistImg src={artist?.images?.huge} />
                </Section1>
                <Slider>
                    <Section2 ref={ref}>
                        {eventList.map((data, index) => {
                            return (
                                <>
                                {(data?.stats?.lowest_price !== null) && <Event key={index} onClick={() => handleClick(data?.id)}>
                                    <h4>{moment(data?.datetime_local).format("MMM D YYYY")} - {data?.title}</h4>
                                    <P>${data?.stats?.lowest_price} - {data?.venue?.name} - {data?.venue?.display_location}</P>
                                </Event>}
                                </>
                            )
                        })}
                        <LeftButton onClick={() => scrollLeft()}><BsFillArrowUpCircleFill size={30}/></LeftButton>
                        <RightButton  onClick={() => scrollRight()}><BsFillArrowDownCircleFill size={30}/></RightButton>
                    </Section2>
                </Slider>
            </Main>
        </Wrapper> : <Loading />}
        </>
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
    height: 480px;
    margin-bottom: 40px;
    overflow-y: scroll;
    margin-right: 3%;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    
    &::-webkit-scrollbar{
        visibility: hidden;
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
    background-color: whitesmoke;
    scroll-snap-align: start;
    
    &:hover{
        border: 1px solid silver;
    }
    `

const P = styled.p`
    margin-top: 10px;
    `

const LeftButton = styled.button`
    z-index: 1000;
    position: absolute;
    left: 45%;
    top: -3%;
    border: none;
    background-color: transparent;
    color: darkgray;
    cursor: pointer;
    opacity: 0;
    
    &:hover{
        color: gray;
    }
    `

const RightButton = styled.button`
    position: absolute;
    left: 45%;
    bottom: 4%;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: darkgray;
    opacity: 0;
    
    &:hover{
        color: gray;
    }
    `

const Slider = styled.div`
    position: relative;

    &:hover ${LeftButton} {
        opacity: 1;
        transform: 2s ease;
    }

    &:hover ${RightButton} {
        opacity: 1;
    }
`

export default ArtistDetail;