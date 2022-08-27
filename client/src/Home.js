import { useEffect, useState, useRef } from "react";
import styled from "styled-components"
import {useNavigate} from "react-router-dom";
import Category from "./AllCategories";

const Home = () => {
  const [recommendations, setRecommendations] = useState(null);

  const titleRef = useRef();
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

    const slideLeft = () => {
      titleRef.current.scrollIntoView({ behavior: "smooth", left:1 });
    }

    const slide = (shift) => {
      titleRef.current.scrollLeft -= shift
    }

    return(
      <>
        <Category />
        <Main>
          <H1>Artists</H1>
          {/* <LeftButton onClick={() => slide(-50)}>L</LeftButton>
          <RightButton onClick={() => slide(+50)}>R</RightButton> */}
          <Slider>
            {recommendations !== null ? <Artists>
              {recommendations !== null && recommendations.map((data, index) => {
                return(
                  <Wrapper ref={titleRef} key={index} onClick={() => handleClick(data.performer.id)}>
                    <Img src={data?.performer?.image} alt="event"/>
                    {(data?.performer?.name.length >= 35) ? <Title>{data?.performer?.name.slice(0, 25)}...</Title> : <Title>{data?.performer?.name}</Title>}
                    <Genre>Genre: {data?.performer?.genres[0].name}</Genre>
                  </Wrapper>
                )
              })}
          </Artists>: <p> Loading....</p>}
          </Slider>
        </Main>
      </>
    )
}

const Main = styled.div`
  position: relative;
    margin: 0px 66px;
`

const Artists = styled.div`
  width: 90%;
`

const Slider = styled.div`
    height: fit-content;
    margin: 0 0px 50px 0px;
    overflow: auto;
    display: flex;
    white-space: nowrap;
    scroll-snap-type: x mandatory;
    overscroll-behavior-inline: contain;
    scroll-padding-left: 3px;

&::-webkit-scrollbar{
    display: none;
}
`

const Wrapper = styled.div`
  display: inline-block;
  margin: 20px 1.5% 20px 2%;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  width: 33.8%;
  border-radius: 15px;
  box-shadow: 1px 1px 10px 1px #888888;
  height: fit-content;
  scroll-snap-align: start;
`

const LeftButton = styled.button`
    position: absolute;
    top: 0%;
    right: 50px;
    padding: 5px;
`

const RightButton = styled.button`
    position: absolute;
    top: 0%;
    right: 20px;
    padding: 5px;
`

const H1 = styled.h1`

`

const Img = styled.img`
  width: 100%;
  border-radius: 15px 15px 0px 0px;
`

const Title = styled.p`
  font-weight: bold;
  font-size: 18px;
  padding-top: 20px;
`

const Genre = styled.p`
  font-size: 18px;
  padding: 20px 0px;
`

export default Home;