import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const CategoryDetail = () => {
    const [favorite, setFavorite] = useState([])


    useEffect(() => {
      getFavoriteList()
    }, [])

    const getFavoriteList = () => {
        fetch(`/events`)
        .then((res) => res.json())
        .then((data) => {
            setFavorite(data.data)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }

    const deleteEvent = (id) => {
      fetch(`/favorite/event/${id}`, {method: "DELETE"})
      .then((res) =>  res.json())
      .catch(e => {
        console.log("error", e);
      });
      
      getFavoriteList()
      }

    const navigate = useNavigate();
    const handleClick = (id) => {
      navigate(`/event/id/${id}`)
    }
    

    return( 
        <>
        <Events>
          <H1>Favorite List</H1>
            {favorite !== null ? <Main>
                {favorite.map((data, index) => {
                return (
                    (data.image !== null) && 
                        <Wrapper key={index} onClick={() => handleClick(data?._id)}>
                        <Img src={data.image} />
                        {(data?.title.length >= 17) ?<Title>{data?.title.slice(0, 30)}...</Title>:<Title>{data?.title}</Title>}
                        {(data?.venue.length >= 27) ? <Genre>{data?.venue.slice(0, 30)}...</Genre>: <Genre>{data?.venue}</Genre>}
                        {data.ticket !== null ? <EventCount>${data?.ticket}</EventCount>: <EventCount>Find Tickets</EventCount>}
                        <Delete onClick={(event) => {event.stopPropagation(); deleteEvent(data._id)}}>X</Delete>
                        </Wrapper>
                    )
                })}
            </Main> : <p>"Loading..."</p>}
            </Events>
        </>
    )
}

const H1 = styled.h1`
  margin-left: 1.5%;
`

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
  height: fit-content;
  margin: 20px 1.5%;
  border-radius: 15px;
  cursor: pointer;
  text-align: center;
  width: 30%;
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
  padding: 10px 0px;
`

const Delete = styled.button`
color: limegreen;
padding: 1% 2%;
margin: 20px 0px;
background-color: black;
cursor: pointer;
border-radius: 50%;
position: absolute;
right: 8px;
top: -12px;
font-weight: bold;

&:hover{
  background-color: black;
  color: white;
}
`

export default CategoryDetail;