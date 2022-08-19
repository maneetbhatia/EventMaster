import { useState, useEffect } from "react";
import moment from 'moment';
import styled from "styled-components"

const Events = () => {
    const [datas, setDatas] = useState(null);

    useEffect(() => {
        fetch("/events")
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data[0].events);
            setDatas(data.data[0].events)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [])

    return (
        <>
            {datas !== null ? <Main>
                {/* <h1>Events:</h1> */}
                {datas !== null && datas.map((data, index) => {
                    return(
                        (data?.performers[0]?.image !== null) &&
                            <Wrapper key={index}>
                            <Img src={data?.performers[0]?.image} alt="event"/>
                            <Title>{data.title}</Title>
                            <Type>{data?.type}</Type>
                            <Time>{moment(data.datetime_local).format('MMMM Do YYYY, h:mm:ss a')}</Time>
                            </Wrapper>
                    )
                })}
                </Main>: <p> Loading....</p>}
        </>
    )
}

export default Events;

const Main = styled.div`
    width: 90%;
    margin: auto;
`

const Wrapper = styled.div`
width: 25%;
background-color: ghostwhite;
padding: 15px;
height: 380px;
margin: 40px 2.8%;
justify-content: space-between;
border-radius: 15px;
box-shadow: 1px 1px 10px 1px #888888;
display: inline-grid;
grid-template-columns: auto;
text-align: center;
cursor: pointer;

&:hover{
    zoom: 1px;
}
`

const Img = styled.img`
width: 100%;
`

const Title = styled.p`
padding-top: 20px;
`

const Type = styled.p`
padding-top: 20px;
`

const Time = styled.div`
padding-top: 20px;
`