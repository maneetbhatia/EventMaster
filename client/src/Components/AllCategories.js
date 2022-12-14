import { useEffect, useState, useRef } from 'react';
import styled from "styled-components"
import {useNavigate} from "react-router-dom";
import LoadingPage from './LoadingPage'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

const AllCategories = () => {
    const [events, setEvents] = useState(null)

    const ref = useRef(null);

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
            setEvents(data.data.taxonomies)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [])

    const scrollLeft = () => {
        ref.current.scrollLeft = ref.current.scrollLeft - 300;
    };

    const scrollRight = () => {
        ref.current.scrollLeft = ref.current.scrollLeft + 300;
    };
    
    return( 
        <>
            <Categories>
                <H1>{"Categories"}</H1>
                <Slider data-test={"slider"} ref={ref}>
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
                        <LeftButton onClick={() => scrollLeft()}><BsFillArrowLeftCircleFill size={30}/></LeftButton>
                        <RightButton  onClick={() => scrollRight()}><BsFillArrowRightCircleFill size={30}/></RightButton>
                    </Main>: <LoadingPage />}
                </Slider>
            </Categories>
        </>
    )
}

export default AllCategories;

const Categories = styled.div`
    position: relative;
    margin: 80px 60px 0px 67px;
`

const Slider = styled.div`
    height: fit-content;
    margin: 0 0px 50px 0px;
    display: flex;
    white-space: nowrap;
    overflow: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar{
        visibility: hidden;
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
    scroll-snap-align: start;
    display: inline-block;
    margin: 20px 2%;
    border-radius: 15px;
    text-align: center;
    cursor: pointer;
    width: 24.7%;
    position: relative;
    height: fit-content;
    
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

const LeftButton = styled.button`
    position: absolute;
    right: 56px;
    top: 5px;
    border: none;
    background-color: transparent;
    color: gray;
    cursor: pointer;
`

const RightButton = styled.button`
    position: absolute;
    right: 16px;
    top: 5px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: gray;
`