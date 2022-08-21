import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from "styled-components"
import {useNavigate} from "react-router-dom";
import moment from 'moment';

const Category = () => {
    const [events, setEvents] = useState(null)
    
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/event/id/${id}`)
    }

    const {category} = useParams();
    let getCategory = category.charAt(0).toLowerCase()+category.slice(1)

    if(getCategory === "music"){
        getCategory = "music_festival"
    }

    useEffect(() => {
        fetch(`/event/category/${getCategory}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data.events);
            setEvents(data.data.events)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [category])

    return( 
        <>
            <H1>{category}</H1>
            {events !== null ? <Main>
                {events !== null && events.map((data, index) => {
                    return(
                        (data?.performers[0]?.image !== null) &&
                            <Wrapper key={index} onClick={() => handleClick(data.id)}>
                            <Img src={data?.performers[0]?.image} alt="event"/>
                            <Title>{data.short_title}</Title>
                            <Type>{data?.venue.name} - {moment(data.datetime_local).format('MMM DD')}</Type>
                            {data?.stats?.lowest_price !== null ? <Prize>From: ${data?.stats?.lowest_price}</Prize> : <Prize>Find tickets </Prize>}
                            </Wrapper>
                        )
                })}
            </Main>: <p> Loading....</p>}
        </>
    )
}

export default Category;

const Main = styled.div`
    display: flex;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`

const H1 = styled.h1`
width: 86%;
margin: auto;
margin-top: 40px;
border-bottom: 1px solid silver;
`

const Wrapper = styled.div`
height: 340px;
margin: 20px 2.5%;
border-radius: 15px;
padding: 1.5%;
cursor: pointer;
box-shadow: 1px 1px 10px 1px #888888;
width: 25%;
&:hover{
}
`

const Img = styled.img`
width: 100%;
`

const Title = styled.p`
font-weight: bold;
font-size: 18px;
padding-top: 15px;
`

const Type = styled.p`
padding-top: 10px;
color: grey;
`

const Prize = styled.p`
font-size: 18px;
padding-top: 10px;
`