import { useEffect, useState } from 'react';
import styled from "styled-components"
import {useParams, useNavigate} from "react-router-dom";
import moment from 'moment';
import { MdFavorite } from 'react-icons/md';

const SearchResults = () => {
    const [events, setEvents] = useState(null)
    const {searchValue} = useParams();
    
    useEffect(() => {
        fetch(`/search/${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setEvents(data)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [searchValue]);

    const navigate = useNavigate();
    const handleClick = (id) => {
      navigate(`/event/id/${id}`)
    }

    const handlefav =(data) => {
      console.log("data", data)
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

    return( 
        <>
        <Events>
            {events?.data ?
              <Main>
                {events?.data?.events.map((eventData, index) => {
                  return (
                    (eventData.performers[0].image !== null) &&
                      <Wrapper key={index} onClick={() => handleClick(eventData?.id)}>
                        <Img src={eventData.performers[0].image} />
                        {(eventData?.title.length >= 70) ? <Title>{eventData?.title.slice(0, 160)}...</Title> : <Title>{eventData?.title}</Title>}
                        <Genre>{moment(eventData?.datetime_local).format("MMM DD")} - {(eventData?.venue?.name.length >= 17) ? eventData?.venue?.name.slice(0, 10)+"..." : eventData?.venue?.name}</Genre>
                        {eventData?.stats?.lowest_price !== null ? <EventCount>${eventData?.stats?.lowest_price}</EventCount>: <EventCount>Find Tickets</EventCount>}
                        <Fav onClick={(event) => {event.stopPropagation(); handlefav(eventData)}}><MdFavorite size={20}/></Fav>
                      </Wrapper>
                  )
                })}
              </Main> 
            : <ErrorMessage>{events?.message}</ErrorMessage>}
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
  font-size: 15px;
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

const ErrorMessage = styled.p`
color: red;
margin-left: 50px;
margin-bottom: 40px;
`

const Fav = styled.span`
position: absolute;
top: 8px;
right: 10px;
color: white;

&:hover{
  color: red;
}
`

export default SearchResults;