import { useContext, useEffect, useReducer, useState } from 'react';
import styled from "styled-components"
import {useParams, useNavigate} from "react-router-dom";
import { MdFavorite } from 'react-icons/md';
import {UserContext} from './UserContext';
import Signin from './Signin';
import moment from "moment";


const CategoryDetail = () => {
    const [events, setEvents] = useState(null);
    const {name,isLogedIn, isModalOpen, setIsModalOpen} = useContext(UserContext)
    const navigate = useNavigate();

    const {category} = useParams();

    useEffect(() => {
        fetch(`/event/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setEvents(data?.data?.events)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [])

    const handleClick = (id) => {
      navigate(`/event/id/${id}`)
    }

    const navigateToHome =() => {
      navigate("/")
    }

    const byPrice = (a,b) => {
      console.log(a?.stats?.lowest_price)
      if(a?.stats?.lowest_price > b?.stats?.lowest_price){
        return 1;
      }else if(a?.stats?.lowest_price < b?.stats?.lowest_price){
        return -1;
      }else{
        return 0;
      }
    }

    const byTime = (a,b) => {
      console.log(a?.datetime_utc)
      if(a?.datetime_utc > b?.datetime_utc){
        return 1;
      }else if(a?.datetime_utc < b?.datetime_utc){
        return -1;
      }else{
        return 0;
      }
    }

    const byHighestToLowest = (a,b) => {
      console.log(a?.stats?.lowest_price)
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

    console.log("events ",events)

    const handlefav =(data) => {
      if(name === null || isLogedIn === false){
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
      }).then(res =>  res.json())
      .catch(e => {
          console.log("error", e);
      });
    }
    // console.log("ismodalopen" , isModalOpen)
    return( 
        <>
          <Events>
            {events !== null ?
            <>
              <Category>{category}</Category>
              <LI onClick={handleHighestToLowest}>Highest to Lowest Price</LI>
              <LI onClick={handleLowestToHighest}>
                Lowest to Highest Price
              </LI>
              <LI onClick={handleTime}>By Date</LI>
            {/* </UL> */}
            <Main>
            { events !== undefined ?
                events.map((data, index) => {
                return (
                    (data?.stats?.lowest_price !== null && data.performers[0].image !== null) && 
                        <Wrapper key={index} onClick={() => handleClick(data?.id)}>
                        <Imgg>
                          <Img src={data.performers[0].image} />
                        </Imgg>
                        <div>
                        {(data?.title.length >= 29) ?<Title>{data?.title.slice(0, 25)}...</Title> : <Title>{data?.title}</Title>}
                        <Genre> {moment(data?.datetime_local).format('MMM DD [at] h:mm a')}</Genre>
                        {data?.stats?.lowest_price !== null && <EventCount>From ${data?.stats?.lowest_price}</EventCount>}
                        <Fav onClick={(event) => {event.stopPropagation(); handlefav(data)}}><MdFavorite  size={20}/>
                        {/* <AddToFavorite>Add to favorite</AddToFavorite> */}
                        </Fav>
                        <TitleTollTip>{data?.title} - {data?.venue?.name}</TitleTollTip>
                        </div>
                        </Wrapper>
                )
            }) : <p>No events found, please look for different <span style={{color: "limegreen", cursor: "pointer"}} onClick={navigateToHome}>Category</span></p>
            }
            </Main></> : "Loading..."}
            </Events>
            {(isModalOpen === true) && <Signin />}
        </>
    )
}

const Category = styled.span`
margin: 0px 35px 20px 20px;
font-size: 35px;
`

const LI = styled.span`
float: right;
padding: 1% 2%;
margin-left: 10px;
width: fit-content;
border-radius: 15px;
/* background-color: aliceblue; */
cursor: pointer;
font-size: 18px;
color: grey;
`

const P = styled.p`

`

const Events = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 90px;
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

const Imgg = styled.div`
overflow: hidden;
`

const Img = styled.img`
width: 100%;
border-radius: 15px 15px 0px 1px;
object-fit: cover;
&:hover{
transform: scale(1.025);
transition: 200ms transform ease-in-out;
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

const TitleTollTip = styled.span`
position: absolute;
bottom: -20px;
right: 0px;
padding: 2px 0px;
border: 1px solid limegreen;
background-color: white;
font-size: 12px;
opacity: 0;
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

export default CategoryDetail;