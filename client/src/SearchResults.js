import { useEffect, useState } from 'react';
import styled from "styled-components"
import {useParams, useNavigate} from "react-router-dom";
import moment from 'moment';
import { MdFavorite } from 'react-icons/md';
import Pagination from './Pagination';
import Loading from './LoadingPage'
import LoadingPage from './LoadingPage';

const SearchResults = () => {
    const [events, setEvents] = useState(null)
    const [eventsArr, setEventsArr] = useState(null);
    const [pageCount, setPageCount] = useState(1)
    const {searchValue} = useParams();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(`/search/${searchValue}/${pageCount}`)
        .then((res) => res.json())
        .then((data) => {
          setEventsArr(data)
          setEvents(data?.data?.events)
        }).catch((err) => {
            console.log("error", err);
        }) 

        setTimeout(() => {
          setLoading(false)
        }, 1000)
    }, [searchValue, pageCount]);

    const navigate = useNavigate();
    const handleClick = (id) => {
      navigate(`/event/id/${id}`)
    }

    const IncrementPageCount = () => {
      if(pageCount < Math.ceil(eventsArr?.data?.meta?.total/32)){
        setPageCount(pageCount + 1)
        setLoading(true)
      }
    }

    const DecrementPageCount = () => {
      if(pageCount > 1){
        setPageCount(pageCount - 1)
        setLoading(true)
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
      {events !== null ?
        <>
        {events !== undefined && <Pagination length={eventsArr?.data?.meta} handleIncrement={IncrementPageCount} handleDecrement={DecrementPageCount}/>}
        {events !== undefined && <Sort>
              <LI onClick={handleTime}>By Date</LI>
              <LI onClick={handleLowestToHighest}>
                Lowest to Highest Price
              </LI>
              <LI onClick={handleHighestToLowest}>Highest to Lowest Price</LI>
            </Sort>}
          <Events>
            {events !== null && !loading ?
            <>
              <Main>
                {events !== undefined ?
                  events.map((eventData, index) => {
                    return (
                      (eventData?.stats?.lowest_price !== null && eventData.performers[0].image !== null) &&
                        <Wrapper key={index} onClick={() => handleClick(eventData?.id)}>
                         
                            <Img src={eventData.performers[0].image} />
                          
                          <EventInfo>
                          {(eventData?.title.length >= 25) ? <Title>{eventData?.title.slice(0, 25)}...</Title> : <Title>{eventData?.title}</Title>}
                          <TitleTollTip>{eventData?.title}</TitleTollTip>
                          </EventInfo>
                          <Genre>{moment(eventData?.datetime_utc).format('MMM DD [at] h:mm a')}</Genre>
                          <EventCount>${eventData?.stats?.lowest_price}</EventCount>
                          <Fav onClick={(event) => {event.stopPropagation(); handlefav(eventData)}}><MdFavorite size={20}/></Fav>
                        </Wrapper>
                    )
                  }) : <ErrorMessage>No events found, please search something else...</ErrorMessage>}
              </Main> 
            </> :<Loading /> }
          </Events>
        </>: <LoadingPage />}
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

const Sort = styled.div`
  width: 67%;
  margin: auto;
  margin-top: 50px;
  display: flex;
  /* background-color: red; */
  justify-content: space-evenly;

  @media (max-width: 930px) {
    width: 90%;
    margin: auto;
  }

  @media (max-width: 700px) {
    width: 90%;
    margin: auto;
    margin-top: 20px;
    display: block;
    text-align: center;
  }

  @media (max-width: 630px) {
    width: 80%;
    margin: auto;
    margin-top: 20px;
  }
`

const LI = styled.p`
  background-color: whitesmoke;
  padding: 1% 3%;
  margin: 0px 10px;
  cursor: pointer;
  font-size: 18px;
  color: grey;
  border-radius: 10px;
  scroll-snap-align: start;

  &:hover{
    color: black;
  }

  @media (max-width: 700px) {
    width: 80%;
    margin: auto;
    margin-top: 3%;
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

  &:hover{
    transform: scale(1.05);
    transition: 200ms transform ease-in-out;
  }

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
  object-fit: cover;
`

const Title = styled.p`
  font-weight: bold;
  font-size: 14.5px;
  padding-top: 15px;

  @media (max-width: 650px) {
    font-size: 16px;
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
  margin-left: 60px;
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

export default SearchResults;