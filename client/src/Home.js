import { useEffect, useState } from "react";
import styled from "styled-components"
import {useNavigate} from "react-router-dom";
import Category from "./AllCategories";

const Home = () => {
  const [recommendations, setRecommendations] = useState(null);
    
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/artist/id/${id}`)
  }

  useEffect(() => {
      fetch(`/event/recommendations`)
          .then((res) => res.json())
          .then((data) => {
              console.log(data.data.recommendations);
              setRecommendations(data.data.recommendations)
          }).catch((err) => {
              console.log("error", err);
      }) 
  }, [])

    return(
      <>
      <Category />
      <Main>
      <H1>Artists</H1>
      {recommendations !== null ? <Artists>
                {recommendations !== null && recommendations.map((data, index) => {
                    return(
                      <Wrapper key={index} onClick={() => handleClick(data.performer.id)}>
                      <Img src={data?.performer?.image} alt="event"/>
                      <Title>{data?.performer?.name}</Title>
                      <Genre>Genre: {data.performer.genres[0].name}</Genre>
                      <EventCount>Upcoming events: {data?.performer?.num_upcoming_events}</EventCount>
                      </Wrapper>
                    )
                })}
            </Artists>: <p> Loading....</p>}
            </Main>
      </>
    )
}

const Main = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 60px;
`

const Artists = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Wrapper = styled.div`
  height: 320px;
  margin: 20px 1.5%;
  border-radius: 15px;
  cursor: pointer;
  text-align: center;
  width: 22%;
  box-shadow: 1px 1px 8px 1px grey;

  &:hover{

  }
`

const H1 = styled.h1`
  margin-left: 22px;
`

const Img = styled.img`
  width: 100%;
  border-radius: 15px;
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

export default Home;