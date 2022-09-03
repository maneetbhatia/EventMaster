import { useEffect, useState } from 'react';
import styled from "styled-components"
import {useParams, useNavigate} from "react-router-dom";
import moment from 'moment';
import { MdFavorite } from 'react-icons/md';
import Pagination from './Pagination';

const SearchResults = () => {
    const [events, setEvents] = useState(null)
    const [eventsArr, setEventsArr] = useState(null);
    const [pageCount, setPageCount] = useState(1)
    const {searchValue} = useParams();

    useEffect(() => {
        fetch(`/search/${searchValue}/${pageCount}`)
        .then((res) => res.json())
        .then((data) => {
          setEventsArr(data)
            setEvents(data?.data?.events)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [searchValue, pageCount]);

    const navigate = useNavigate();
    const handleClick = (id) => {
      navigate(`/event/id/${id}`)
    }

    const IncrementPageCount = () => {
      if(pageCount < eventsArr?.data?.meta?.total){
        setPageCount(pageCount + 1)
      }
    }

    const DecrementPageCount = () => {
      if(pageCount > 1){
        setPageCount(pageCount - 1)
      }
    }

    const byPrice = (a,b) => {
      if(a?.stats?.lowest_price > b?.stats?.lowest_price){
        return 1;
      }else if(a?.stats?.lowest_price < b?.stats?.lowest_price){
        return -1;
      }else{
        return 0;
      }
    }

    const byTime = (a,b) => {
      if(a?.datetime_utc > b?.datetime_utc){
        return 1;
      }else if(a?.datetime_utc < b?.datetime_utc){
        return -1;
      }else{
        return 0;
      }
    }

    const byHighestToLowest = (a,b) => {
      if(a?.stats?.lowest_price < b?.stats?.lowest_price){
        return 1;
      }else if(a?.stats?.lowest_price > b?.stats?.lowest_price){
        return -1;
      }else{
        return 0;
      }
    }

    const handleLowestToHighest = async() => {
      const newEventsArr = await events.filter((event) => {
        return event.stats.lowest_price !== null
      })

      const sortedEvents = await newEventsArr.sort(byPrice);

      setEvents(sortedEvents)
    }

    const handleHighestToLowest = async() => {
      const newEventsArr = await events.filter((event) => {
        return event.stats.lowest_price !== null
      })

      const sortedEvents = await newEventsArr.sort(byHighestToLowest);

      setEvents(sortedEvents)
    }

    const handleTime = async() => {
      const newEventsArr = await events.filter((event) => {
        return event.stats.lowest_price !== null
      })

      const sortedEvents = await newEventsArr.sort(byTime);

      setEvents(sortedEvents)
    }

    const handlefav =(data) => {
      // console.log("data", data)
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
          <Div>
            <Category>{searchValue}</Category>
            <Sort>
              <LI onClick={handleTime}>By Date</LI>
              <LI onClick={handleLowestToHighest}>
                Lowest to Highest Price
              </LI>
              <LI onClick={handleHighestToLowest}>Highest to Lowest Price</LI>
            </Sort>
          </Div>
        <Events>
            {events !== null ?
            <>
          {/* </UL> */}
              <Main>
                {events !== undefined ?
                events.map((eventData, index) => {
                  return (
                    (eventData?.stats?.lowest_price !== null && eventData.performers[0].image !== null) &&
                      <Wrapper key={index} onClick={() => handleClick(eventData?.id)}>
                        <Imgg>
                        <Img src={eventData.performers[0].image} />
                        </Imgg>
                        <EventInfo>
                        {(eventData?.title.length >= 25) ? <Title>{eventData?.title.slice(0, 25)}...</Title> : <Title>{eventData?.title}</Title>}
                        <TitleTollTip>{eventData?.title}</TitleTollTip>
                        </EventInfo>
                        <Genre>{moment(eventData?.datetime_utc).format('MMM DD [at] h:mm a')}</Genre>
                        <EventCount>${eventData?.stats?.lowest_price}</EventCount>
                        <Fav onClick={(event) => {event.stopPropagation(); handlefav(eventData)}}><MdFavorite size={20}/></Fav>
                      </Wrapper>
                  )
                }) : <ErrorMessage>No events found, please search something else</ErrorMessage>}
              </Main> </> :"Loading..." }
            {events !== undefined && <Pagination length={eventsArr?.data?.meta} handleIncrement={IncrementPageCount} handleDecrement={DecrementPageCount}/>}
        </Events>
        </>
    )
}

const TitleTollTip = styled.span`
  position: absolute;
  top: 72%;
  left: 50%;
  width: 90%;
  padding: 5px;
  transform: translate(-50%, -50%);
  background-color: white;
  font-size: 13px;
  opacity: 0;
  border-radius: 15px;
  box-shadow: 1px 1px 5px 1px black;
  `

const Div = styled.div`
display: grid;
grid-template-columns: 30% 70%;
width: 87%;
margin: auto;
margin-top: 100px;

@media (max-width: 900px) {
  grid-template-columns: 100%;
  }
`

const Sort = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 630px) {
    margin-top: 20px;
    display: block;
    text-align: center;
  }
`

const Category = styled.h1`
  font-size: 40px;

  @media (max-width: 900px) {
    text-align: center;
  }
`

const LI = styled.p`
  background-color: whitesmoke;
  padding: 2%;
  cursor: pointer;
  font-size: 18px;
  color: grey;
  border-radius: 50px;

  &:hover{
    color: black;
  }
`

const Events = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 40px;
`

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  `

const Wrapper = styled.div`
  height: fit-content;
  margin: auto;
  margin-bottom: 40px;
  border-radius: 15px;
  cursor: pointer;
  text-align: center;
  width: 22%;
  box-shadow: 1px 1px 8px 1px grey;
  position: relative;
  padding-bottom: 10px;

  @media (max-width: 1250px) {
    width: 30%;

}

@media (max-width: 980px) {
    width: 45%;
}

@media (max-width: 630px) {
    width: 80%;
}

@media (max-width: 450px) {
    width: 99%;
}
`

const Img = styled.img`
width: 100%;
border-radius: 15px 15px 0px 1px;
`

const Title = styled.p`
  font-weight: bold;
  font-size: 15px;
  padding-top: 15px;

  @media (max-width: 650px) {
    font-size: 18px;
}
`

const Genre = styled.p`
  font-size: 15px;
  padding-top: 10px;

  @media (max-width: 650px) {
    font-size: 18px;
}
`

const EventCount = styled.p`
  font-size: 15px;
  padding-top: 10px;

  @media (max-width: 650px) {
    font-size: 18px;
}
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

const EventInfo = styled.div`
&:hover ${TitleTollTip} {
  opacity: 1;
}
`

const Imgg = styled.div`
  overflow: hidden;
  height: 180px;
`

export default SearchResults;