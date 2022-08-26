import { useEffect, useState } from 'react';
import styled from "styled-components"
import {useParams, useNavigate} from "react-router-dom";
import moment from 'moment';

const SearchResults = () => {
    const [events, setEvents] = useState(null)
    const {searchValue} = useParams();
    
    useEffect(() => {
        fetch(`/search/${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setEvents(data)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [searchValue]);

    const navigate = useNavigate();
    const handleClick = (id) => {
      navigate(`/event/id/${id}`)
    }

    return( 
        <>
        <Events>
            {events?.data ?
              <Main>
                {events?.data?.events.map((event, index) => {
                  return (
                    (event.performers[0].image !== null) &&
                      <Wrapper key={index} onClick={() => handleClick(event?.id)}>
                        <Img src={event.performers[0].image} />
                        <Title>{event?.title}</Title>
                        <Genre>{moment(event?.datetime_local).format("MMM DD")} - {event?.venue?.name}</Genre>
                        {event?.stats?.lowest_price !== null ? <EventCount>${event?.stats?.lowest_price}</EventCount>: <EventCount>Find Tickets</EventCount>}
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
  height: 340px;
  margin: 20px 1.5%;
  border-radius: 15px;
  cursor: pointer;
  text-align: center;
  width: 22%;
  box-shadow: 1px 1px 8px 1px grey;
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

const ErrorMessage = styled.p`
color: red;
margin-left: 50px;
margin-bottom: 40px;
`

export default SearchResults;