import { useState, useEffect } from "react";
import moment from 'moment';
import styled from "styled-components"

const Events = () => {
    const [datas, setDatas] = useState(null);

    const handleClick = (id) => {
        console.log(id)
    }

    useEffect(() => {
        fetch("/event/sports")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // setDatas(data)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [])

    useEffect(() => {
        fetch("/events")
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.data);
            setDatas(data.data)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [])

    return (
        <>
            {datas !== null ? <Main>
                {datas !== null && datas.map((data, index) => {
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

export default Events;

const Main = styled.div`
    display: flex;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
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