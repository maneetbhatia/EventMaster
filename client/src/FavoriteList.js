import { useEffect, useState } from 'react';
import styled from "styled-components"
import moment from 'moment';

const CategoryDetail = () => {
    const [favorite, setFavorite] = useState([])

    useEffect(() => {
        fetch(`/events`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data);
            setFavorite(data.data)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [])


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
                        <Title>{data?.title}</Title>
                        <Genre>{moment(data?.datetime_local).format("MMM DD")} - {data?.venue}</Genre>
                        {data.ticket !== null ? <EventCount>${data?.ticket}</EventCount>: <EventCount>Find Tickets</EventCount>}
                        <span>Del</span>
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

export default CategoryDetail;