import { useEffect, useState } from 'react';
import styled from "styled-components"
import {useNavigate} from "react-router-dom";

const AllCategories = () => {
    const [events, setEvents] = useState(null)

    const navigate = useNavigate();
    const handleClick = (category) => {
        navigate(`/category/${category}`)
    }

    const categories = ["Comedy", "Concert", "WWE", "Golf","NHL", "Hockey"]
    
    useEffect(() => {
        fetch(`/taxonomies`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data.taxonomies);
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
                </Main>: <p> Loading....</p>}
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

const LeftButton = styled.button`
    position: absolute;
    top: 0%;
    right: 50px;
    padding: 5px;
`

const RightButton = styled.button`
    position: absolute;
    top: 0%;
    right: 20px;
    padding: 5px;
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
    &:hover{
        /* box-shadow: 1px 1px 10px 1px #888888; */
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
`