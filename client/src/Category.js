import { useEffect, useState } from 'react';
import styled from "styled-components"
import {useNavigate} from "react-router-dom";

const Category = () => {
    const [events, setEvents] = useState(null)

    
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/event/id/${id}`)
    }

    const categories = ["Concerts", "Broadway Shows", "Comedy", "Music Festivals"]
    
    useEffect(() => {
        fetch(`/events`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data);
            setEvents(data.data.events)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [])

    const slideLeft = () => {
        document.getElementsByClassName('slideLeft').scrollLeft += 50;
    }

    const slideRight = () => {
        let slider = document.getElementsByClassName('slideRight');
    }

    return( 
        <>
        <Categories>
            <H1>{"Categories"}</H1>
            <LeftButton onClick={slideLeft}>L</LeftButton>
            <RightButton className='slideRight' onClick={slideRight}>R</RightButton>
        <Slider>
            {events !== null ? <Main>
                {events !== null && events.map((data, index) => {
                    return(
                        (data?.performers[0]?.image !== null) &&
                            <Wrapper className='slideLeft' key={index} onClick={() => handleClick(data.id)}>
                            <Img src={data?.performers[0]?.image} alt="event"/>
                            <Title>{data?.taxonomies[0].name}</Title>
                            </Wrapper>
                        )
                })}
            </Main>: <p> Loading....</p>}
            </Slider>
            </Categories>
            
        </>
    )
}

export default Category;

const Categories = styled.div`
    position: relative;
    margin: 0px 60px;
    background-color: aliceblue;
`

const Slider = styled.div`
    height: fit-content;
    margin: 0 0px 50px 0px;
    overflow: scroll;
    display: flex;
    white-space: nowrap;
    scroll-behavior: smooth;

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
    margin-left: 20px;
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
color: red;
left: 5%;
top: 80%;
background-color: black;
`

const Type = styled.p`
padding-top: 10px;
color: grey;
`

const Prize = styled.p`
font-size: 18px;
padding-top: 10px;
`