import { useEffect, useState } from 'react';
import styled from "styled-components"
import {useParams, useNavigate} from "react-router-dom";
import moment from 'moment';

const CategoryDetail = () => {
    const [events, setEvents] = useState(null);
    const [favorite, setFavorite] = useState([])
    const {category} = useParams();

    useEffect(() => {
        fetch(`/event/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.data.events);
            setEvents(data.data.events)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [])

    const navigate = useNavigate();
    const handleClick = (id) => {
      navigate(`/event/id/${id}`)
    }

    const handlefav =(data) => {
      const event = {
        _id: data?.id,
        title: data?.title,
        venue: data?.venue?.name,
        image: data.performers[0].image,
        ticket: data.stats.lowest_price,
      };

      fetch("/event", {
        method: "POST",
        headers: {"Accept": "application/json","Content-Type": "application/json"},
        body: JSON.stringify(event),
      }).then(res =>  res.json())
      .catch(e => {
          console.log("error", e);
      });
    }

    // console.log(favorite)

    return( 
        <>
        
        <Events>
            {events !== null ?<Main>
                {events.map((data, index) => {
                return (
                    (data.performers[0].image !== null) && 
                        <Wrapper key={index} onClick={() => handleClick(data?.id)}>
                        <Img src={data.performers[0].image} />
                        {(data?.title.length >= 17) ?<Title>{data?.title.slice(0, 20)}...</Title> : <Title>{data?.title}</Title>}
                        {(data?.venue?.name.length >= 17) ? <Genre>{data?.venue?.name.slice(0, 25)}...</Genre>: <Genre>{data?.venue?.name}</Genre>}
                        {data?.stats?.lowest_price !== null ? <EventCount>${data?.stats?.lowest_price}</EventCount>: <EventCount>Find Tickets</EventCount>}
                        <Fav onClick={(event) => {event.stopPropagation(); handlefav(data)}}>Fav</Fav>
                        </Wrapper>
                )
            })}
            </Main> : "Loading..."}
            </Events>
        </>
    )
}

const Events = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 60px;
`

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Wrapper = styled.div`
  height: 300px;
  margin: 20px 1.5%;
  border-radius: 15px;
  cursor: pointer;
  text-align: center;
  width: 22%;
  box-shadow: 1px 1px 8px 1px grey;
  position: relative;
`

const Img = styled.img`
width: 100%;
border-radius: 15px 15px 0px 1px;
`

const Title = styled.p`
  font-weight: bold;
  font-size: 18px;
  padding-top: 15px;
`

const Genre = styled.p`
  font-size: 15px;
  padding-top: 10px;
`

const EventCount = styled.p`
  font-size: 15px;
  padding-top: 10px;
`

const Fav = styled.span`
position: absolute;
top: 10px;
right: 15px;
color: greenyellow;

&:hover{
  color: yellow;
}
`

export default CategoryDetail;