import { useContext, useEffect, useReducer, useState } from 'react';
import styled from "styled-components"
import {useParams, useNavigate} from "react-router-dom";
import { MdFavorite } from 'react-icons/md';
import {UserContext} from './UserContext'
import Signin from './Signin'

const CategoryDetail = () => {
    const [events, setEvents] = useState(null);
    const {name,isLogedIn, isModalOpen, setIsModalOpen} = useContext(UserContext)

    const {category} = useParams();

    useEffect(() => {
        fetch(`/event/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setEvents(data)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [])

    const navigate = useNavigate();
    const handleClick = (id) => {
      navigate(`/event/id/${id}`)
    }

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
    console.log("ismodalopen" , isModalOpen)
    return( 
        <>
        <Events>
          <div>
            <ul>
              <li>
                listing count
              </li>
              <li>
                highest price
              </li>
              <li>lowest price</li>
              <li>average price</li>
            </ul></div>
            {events !== null ?
            <Main>
            {!events?.message ? 
                events?.data?.events.map((data, index) => {
                return (
                    (data.performers[0].image !== null) && 
                        <Wrapper key={index} onClick={() => handleClick(data?.id)}>
                        <Imgg>
                          <Img src={data.performers[0].image} />
                        </Imgg>
                        <div>
                        {(data?.title.length >= 29) ?<Title>{data?.title.slice(0, 29)}...</Title> : <Title>{data?.title}</Title>}
                        {(data?.venue?.name.length >= 57) ? <Genre>{data?.venue?.name.slice(0, 25)}...</Genre>: <Genre>{data?.venue?.name}</Genre>}
                        {data?.stats?.lowest_price !== null ? <EventCount>From ${data?.stats?.lowest_price}</EventCount>: <EventCount>Find Tickets</EventCount>}
                        <Fav onClick={(event) => {event.stopPropagation(); handlefav(data)}}><MdFavorite  size={20}/>
                        {/* <AddToFavorite>Add to favorite</AddToFavorite> */}
                        </Fav>
                        <TitleTollTip>{data?.title} - {data?.venue?.name}</TitleTollTip>
                        </div>
                        </Wrapper>
                )
            })
            : <Message>{events?.message}</Message>}
            </Main> : "Loading..."}
            </Events>
            {(isModalOpen === true) && <Signin />}
        </>
    )
}

const Message = styled.p`
margin-bottom: 10%;
font-size: 25px;
margin-left: 6%;
`

const Events = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 60px;
`

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5%;
  /* background-color: red; */
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