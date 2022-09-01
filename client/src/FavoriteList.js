import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { MdDelete } from 'react-icons/md';

const CategoryDetail = () => {
    const [favorite, setFavorite] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    
    // console.log(isLoading, "isloading")
    // if(!isLoading){
      //   navigate("/")
      // }
      useEffect(() => {
        getFavoriteList()
      }, [])

    const getFavoriteList = () => {
        fetch(`/events`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
            setFavorite(data)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }

    const deleteEvent = async(id) => {
      await fetch(`/favorite/event/${id}`, {method: "DELETE"})
      .then((res) => { res.json(); setIsLoading(true); getFavoriteList()})
      .catch(e => {
        console.log("error", e);
      });
    }

    const handleClick = (id) => {
      navigate(`/event/id/${id}`)
    }
// console.log("favorite", favorite)
    return( 
        <>
        <Events>
          <H1>Favorite List</H1>
            {favorite?.data?.length > 0 && favorite !== null ? <Main>
                {favorite?.data?.map((data, index) => {
                return (
                    (data.image !== null) && 
                        <Wrapper key={index} onClick={() => handleClick(data?._id)}>
                        <Img src={data.image} />
                        {(data?.title.length >= 17) ?<Title>{data?.title.slice(0, 30)}...</Title>:<Title>{data?.title}</Title>}
                        {(data?.venue.length >= 27) ? <Genre>{data?.venue.slice(0, 30)}...</Genre>: <Genre>{data?.venue}</Genre>}
                        {data.ticket !== null ? <EventCount>${data?.ticket}</EventCount>: <EventCount>Find Tickets</EventCount>}
                        <Delete onClick={(event) => {event.stopPropagation(); deleteEvent(data._id)}}><MdDelete size={20} /></Delete>
                        </Wrapper>
                    )
                })}
            </Main>
            : <p>{favorite?.message} </p>}
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
  margin: auto;
  margin-bottom: 20px;
  border-radius: 15px;
  cursor: pointer;
  text-align: center;
  width: 30%;
  box-shadow: 1px 1px 8px 1px grey;
  position: relative;

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
  font-size: 18px;
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
  padding: 10px 0px;

  @media (max-width: 650px) {
    font-size: 18px;
}
`

const Delete = styled.span`
color: white;
margin: 20px 0px;
cursor: pointer;
position: absolute;
right: 8px;
top: -12px;
font-weight: bold;

&:hover{
  color: red;
}
`

export default CategoryDetail;