import { useEffect, useState } from 'react';
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
            console.log(data.data);
            setFavorite(data.data)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }

    const deleteEvent = (id) => {
      console.log(id)
        fetch(`/favorite/event/${id}`, {method: "DELETE"})
        .then((res) =>  res.json())
        .catch(e => {
            console.log("error", e);
        });

        getFavoriteList()
      }
    

    return( 
        <>
        <Events>
          <H1>Favorite List</H1>
            {favorite !== null ? <Main>
                {favorite.map((data, index) => {
                return (
                    (data.image !== null) && 
                        <Wrapper key={index}>
                        <Img src={data.image} />
                        <Title>{data?.title.slice(0, 7)}</Title>
                        {(data?.venue.length >= 17) ? <Genre>{data?.venue.slice(0, 25)}...</Genre>: <Genre>{data?.venue}</Genre>}
                        {data.ticket !== null ? <EventCount>${data?.ticket}</EventCount>: <EventCount>Find Tickets</EventCount>}
                        <Delete onClick={() => deleteEvent(data._id)}>X</Delete>
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

const Delete = styled.button`
color: black;
padding: 2%;
margin-top: 10px;
background-color: white;
cursor: pointer;
border-radius: 15px;

&:hover{
  background-color: black;
  color: white;
}
`

export default CategoryDetail;