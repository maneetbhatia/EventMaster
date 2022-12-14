import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { MdDelete } from 'react-icons/md';
import Loading from './LoadingPage';
import { useContext } from 'react';
import { UserContext } from "./UserContext";

const CategoryDetail = () => {
    const [favorite, setFavorite] = useState(null);
    const {isUserLoginIn} = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
      if(isUserLoginIn === false){
          navigate("/");
      }
    }, [isUserLoginIn])  
    
    useEffect(() => {
        getFavoriteList()
      }, [])

    const getFavoriteList = () => {
        fetch(`/events`)
        .then((res) => res.json())
        .then((data) => {
            setFavorite(data)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }

    const deleteEvent = async(id) => {
      await fetch(`/favorite/event/${id}`, {method: "DELETE"})
      .then((res) => { 
        res.json();
      })
      .catch(e => {
        console.log("error", e);
      });
    
      if(favorite !== null){
        const newFavArr = favorite.data.filter(event => {
          return event.eventId !== id})

        let message;
        if(newFavArr.length === 0){
          message = "There are no events in your favorite list";
        }
          setFavorite(v =>({...v, data: newFavArr, message}))
        }
    }
    

    const handleClick = (id) => {
      navigate(`/event/id/${id}`)
    }
    
    return( 
        <>
          <Events>
            <H1>Favorite List</H1>
              {favorite !== null ?
                favorite?.data?.length > 0 ? 
                  <Main>
                      {favorite?.data?.map((data, index) => {
                        return (
                            (data.image !== null && data.isFavorite) && 
                                <Wrapper key={index} onClick={() => handleClick(data?.eventId)}>
                                  <Img src={data.image} />
                                  {(data?.title.length >= 17) ?<Title>{data?.title.slice(0, 30)}...</Title>:<Title>{data?.title}</Title>}
                                  {(data?.venue.length >= 27) ? <Genre>{data?.venue.slice(0, 30)}...</Genre>: <Genre>{data?.venue}</Genre>}
                                  {data.ticket !== null ? <EventCount>${data?.ticket}</EventCount>: <EventCount>Find Tickets</EventCount>}
                                  <Delete onClick={(event) => {event.stopPropagation(); deleteEvent(data.eventId);}}><MdDelete size={20} /></Delete>
                                </Wrapper>
                        )
                      })}
                  </Main>
                : <P>{favorite?.message}</P>
              : <Loading />}
          </Events>
        </>
    )
}

const H1 = styled.h1`
  margin-left: 2.5%;

  @media (max-width: 800px) {
    text-align: center;
  }
`

const Events = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 60px;
`

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 40px 0px;
`

const Wrapper = styled.div`
  height: fit-content;
  margin: 1.65%;
  border-radius: 15px;
  cursor: pointer;
  text-align: center;
  width: 30%;
  box-shadow: 1px 1px 8px 1px grey;
  position: relative;
  
  
  @media (max-width: 1250px) {
    width: 45%;
  }

  @media (max-width: 980px) {
    width: 45%;
  }

  @media (max-width: 800px) {
    width: 70%;
    margin: auto;
    margin-bottom: 40px;
  }

  @media (max-width: 550px) {
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

  @media (max-width: 800px) {
    font-size: 22px;
  }

  @media (max-width: 650px) {
      font-size: 18px;
  }
`

const Genre = styled.p`
  font-size: 18px;
  padding-top: 10px;

  @media (max-width: 800px) {
    font-size: 20px;
  }

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

const P = styled.p`
  width: fit-content;
  margin: auto;
  color: coral;
  padding: 80px 0px 140px 0px;
  font-size: 18px;
`

export default CategoryDetail;