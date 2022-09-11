import { useEffect, useState, useRef } from "react";
import styled from "styled-components"
import {useNavigate} from "react-router-dom";
import Category from "./AllCategories";
import LoadingPage from './LoadingPage';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

const Home = () => {
  const [recommendations, setRecommendations] = useState(null);

  const titleRef = useRef();
  const ref = useRef(null);
  const navigate = useNavigate();
  
  const handleClick = (id) => {
    navigate(`/artist/id/${id}`)
  }

  useEffect(() => {
    console.log("listo")
      fetch(`/event/recommendations`)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data.data.recommendations);
            setRecommendations(data.data.recommendations)
          }).catch((err) => {
            console.log("error", err);
      }) 
  }, [])

  const scrollLeft = () => {
    ref.current.scrollLeft = ref.current.scrollLeft - 300;
  };

  const scrollRight = () => {
      ref.current.scrollLeft = ref.current.scrollLeft + 300;
  };

  console.log("recommendations", recommendations)

    return(
      <>
        <Category />
        <Main>
          <H1>Artists</H1>
          <Slider ref={ref}>
            {recommendations !== null ? 
              <Artists>
                {(recommendations !== null) && recommendations.map((data, index) => {
                  return(
                    (data?.performer?.genres) &&
                    <Wrapper ref={titleRef} key={index} onClick={() => handleClick(data.performer.id)}>
                      <Img src={data?.performer?.image} alt="event"/>
                      {(data?.performer?.name.length >= 35) ? <Title>{data?.performer?.name.slice(0, 25)}...</Title> : <Title>{data?.performer?.name}</Title>}
                      {(data?.performer?.genres) && <Genre>Genre: {data?.performer?.genres[0]?.name}</Genre>}
                    </Wrapper>
                  )
                })}
                <LeftButton onClick={() => scrollLeft()}><BsFillArrowLeftCircleFill size={30}/></LeftButton>
                <RightButton  onClick={() => scrollRight()}><BsFillArrowRightCircleFill size={30}/></RightButton>
              </Artists>: <LoadingPage />}
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
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;

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
  width: 34.3%;
  border-radius: 15px;
  box-shadow: 1px 1px 10px 1px #888888;
  height: fit-content;
  scroll-snap-align: start;

  @media (max-width: 1050px) {
    width: 35%;
}

@media (max-width: 980px) {
    width: 50%;
    margin: 20px 3% 20px 2%;
}

@media (max-width: 730px) {
    width: 70%;
    margin: 20px 6% 20px 2%;
}

@media (max-width: 560px) {
    width: 80%;
    margin: 20px 7% 20px 2%;
}

@media (max-width: 500px) {
    width: 95%;
}

@media (max-width: 450px) {
    width: 99%;
}
`

const H1 = styled.h1`
margin-left: 1px;
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

const LeftButton = styled.button`
  position: absolute;
  right: 50px;
  top: 5px;
  border: none;
  background-color: transparent;
  color: gray;
`

const RightButton = styled.button`
  position: absolute;
  right: 10px;
  top: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: gray;
`

export default Home;