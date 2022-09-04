import { useEffect, useState } from 'react';
import styled from "styled-components"
import {useNavigate} from "react-router-dom";
import LoadingPage from './LoadingPage'

const AllCategories = () => {
    const [events, setEvents] = useState(null)

    const navigate = useNavigate();
    
    const handleClick = (category) => {
        navigate(`/category/${category}`)
    }

    const categories = [
        "Comedy",
        "Concert",
        "WWE",
        "Sports",
        "Music Festivals",
        "Theater",
        "Broadway Shows",
        "Dance Shows",
        "Film",
        "Family Entertainment",
        "Circus",
        "NBA",
        "Boxing",
        "Golf",
        "F1 Racing",
        "Soccer",
        "Hockey",
        "NFL",
        "Baseball"
    ]
    
    useEffect(() => {
        fetch(`/taxonomies`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setEvents(data.data.taxonomies)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [])

    return( 
        <>
            <Categories>
                <H1>{"Categories"}</H1>
                <Slider>
                    {events !== null ? <Main>
                        {events !== null && events.map((data, index) => {
                            return(
                                (categories.includes(data?.name)) &&
                                    <Wrapper className='slideLeft' key={index} onClick={() => handleClick(data?.name)}>
                                    <Img src={events[index].image} alt="event"/>
                                    <Title>{events[index].name}</Title>
                                    </Wrapper>
                                )
                        })}
                    </Main>: <LoadingPage />}
                </Slider>
            </Categories>
        </>
    )
}

export default AllCategories;

const Categories = styled.div`
    position: relative;
    margin: 0px 60px 0px 67px;
`

const Slider = styled.div`
    height: fit-content;
    margin: 0 0px 50px 0px;
    overflow: auto;
    display: flex;
    white-space: nowrap;
    scroll-snap-type: x mandatory;
    overscroll-behavior-inline: contain;
&::-webkit-scrollbar{
    display: none;
}
`

const Main = styled.div`
    width: 90%;
`

const H1 = styled.h1`
    margin-left: 1px;
    margin-top: 40px;
`

const Wrapper = styled.div`
    display: inline-block;
    margin: 20px 2%;
    border-radius: 15px;
    text-align: center;
    cursor: pointer;
    width: 24%;
    position: relative;
    height: fit-content;
    scroll-snap-align: start;
    
    @media (max-width: 1050px) {
    width: 35%;
}

@media (max-width: 850px) {
    width: 50%;
}

@media (max-width: 650px) {
    width: 70%;
}

@media (max-width: 550px) {
    width: 80%;
}

@media (max-width: 450px) {
    width: 95%;
}
`

const Img = styled.img`
width: 100%;
border-radius: 15px;
`

const Title = styled.span`
font-weight: bold;
font-size: 18px;
position: absolute;
color: white;
left: 5%;
top: 80%;
background-color: black;

@media (max-width: 660px) {
    font-size: 17px;
}

@media (max-width: 550px) {
    font-size: 18px;
}
`