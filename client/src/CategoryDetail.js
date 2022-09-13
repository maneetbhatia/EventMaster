import { useContext, useEffect, useState } from 'react';
import styled from "styled-components"
import {useParams, useNavigate} from "react-router-dom";
import moment from "moment";
import { MdFavorite } from 'react-icons/md';
import Pagination from './Pagination';
import LoadingPage from './LoadingPage';
import { UserContext } from './UserContext';

const CategoryDetail = () => {
    const [events, setEvents] = useState(null);
    const [eventsArr, setEventsArr] = useState(null);
    const [pageCount, setPageCount] = useState(1)
    const [loading, setLoading] = useState(false)
    const {isModalOpen, setIsModalOpen, isUserLoginIn, isLogedIn} = useContext(UserContext)

    const navigate = useNavigate();
    const {category} = useParams();
    
    useEffect(() => {
        fetch(`/event/category/${category}/${pageCount}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setEventsArr(data)
            setEvents(data?.data?.events)
        }).catch((err) => {
            console.log("error", err);
        }) 

        setTimeout(() => {
          setLoading(false)
        }, 1000)
    }, [pageCount, category])

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

    const handleClick = (id) => {
      navigate(`/event/id/${id}`)
    }

    const navigateToHome =() => {
      navigate("/")
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
      console.log(isLogedIn, isUserLoginIn)
      if(isLogedIn === null){
        setIsModalOpen(true);
      }

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
      }).then(res =>  {console.log("event", res)})
      .catch(e => {
          console.log("error", e);
      });
    }


    return( 
        <>
          {events !== null?
          <>
          {(events !== undefined) && <Pagination length={eventsArr?.data?.meta} 
            handleIncrement={IncrementPageCount} 
            handleDecrement={DecrementPageCount}/>
          }
          {(events !== undefined) && 
          <Div>
            <Category>{category}</Category>
            <Sort>
              <LI onClick={handleTime}>By Date</LI>
              <LI onClick={handleHighestToLowest}>Highest to Lowest Price</LI>
              <LI onClick={handleLowestToHighest}>
                Lowest to Highest Price
              </LI>
            </Sort>
          </Div>}
          <Events>
              <Main>
                {events !== null && !loading ?
                  events !== undefined ?
                  events.map((data, index) => {
                    return (
                      (data?.stats?.lowest_price !== null && data.performers[0].image !== null) && 
                          <Wrapper key={index} onClick={() => handleClick(data?.id)}>
                            <Img src={data.performers[0].image} />
                          <EventInfo>
                            {(data?.title.length >= 29) ? <Title>{data?.title.slice(0, 25)}...</Title> : <Title>{data?.title}</Title>}
                            {(data?.title.length >= 29) && <TitleTollTip>{data?.title}</TitleTollTip>}
                          </EventInfo>
                          {!moment(data?.datetime_local).fromNow().includes("ago") ?  
                            <Genre>{moment(data?.datetime_local).format('MMM DD [at] h:mm a')}</Genre> :
                            <Genre style={{fontSize: "20px",color:"red", margin: "10px 0px"}}>{"OUTDATED"}</Genre>
                          }
                            {(data?.stats?.lowest_price !== null && !moment(data?.datetime_local).fromNow().includes("ago"))  && <EventCount>From ${data?.stats?.lowest_price}</EventCount>}
                            <Fav
                              onClick={(event) => {event.stopPropagation();
                               handlefav(data)
                               }}><MdFavorite  size={20}/>
                            </Fav>
                          </Wrapper>
                    )
                }) : <P>No events found, please look for different <span style={{color: "limegreen", cursor: "pointer"}} onClick={navigateToHome}>Category</span></P>
              : <LoadingPage />}
              </Main>
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

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 87%;
  margin: auto;
  margin-top: 50px;
  position: relative;
  
  @media (max-width: 850px) {
    flex-direction: column;
  }
  `

const Sort = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;

@media (max-width: 1100px) {
  width: 70%;
}

@media (max-width: 950px) {
  width: 75%;
}

@media (max-width: 850px) {
  width: 90%;
  margin: auto;
  margin-top: 20px;
  display: block;
  text-align: center;
}
`

const Category = styled.h1`
  font-size: 40px;

  @media (max-width: 850px) {
    text-align: center;
  }
`

const LI = styled.p`
  background-color: whitesmoke;
  padding: 2% 5%;
  cursor: pointer;
  font-size: 16px;
  color: grey;
  border-radius: 50px;

  &:hover{
    color: black;
  }

  @media (max-width: 1100px) {
    padding: 2% 5%;
  }

  @media (max-width: 950px) {
    padding: 2% 3%;
  }

  @media (max-width: 850px) {
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
  margin-bottom: 5%;
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
  position: relative;
  box-shadow: 1px 1px 8px 1px grey;
  align-self: normal;
  overflow: hidden;
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

  @media (max-width: 650px) {
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

  const EventInfo = styled.div`
    &:hover ${TitleTollTip} {
      opacity: 1;
    }
  `

const Title = styled.p`
  font-weight: bold;
  font-size: 15px;
  padding-top: 15px;
  
  @media (max-width: 650px) {
    font-size: 18px;
  }
`

const Fav = styled.span`
  color: white;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 8px;
  font-weight: bold;
  
  &:hover{
    color: red;
  }
`

const P = styled.p`
  margin: 40px 60px;
  font-size: 18px;
`

export default CategoryDetail;