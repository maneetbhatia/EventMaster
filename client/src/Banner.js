import styled from "styled-components"
import bannerImg from './Assests/bannerjpg.jpg'
import SearchBar from './SearchBar'
const Banner = () => {
    return(
      <>
        <BannerImg src={bannerImg} alt="banner" />
        <Heading>
          <H2>Let the fun begins</H2>
          <P>Your next best-night-ever is waiting.</P>
          <P>And we have the tickets.</P>
        </Heading>
        <p>Categories</p>
      </>
    )
}

const BannerImg = styled.img`
    width: 100%;
    object-fit: cover;
    object-position: 0px 25%;
    height: 400px;
`

const Heading = styled.div`
position: absolute;
padding: 50px 0px;
opacity: 0.8;
border-radius: 20%;
top: 15%;
left: 22%;
width: 55%;
color: white;
text-align: center;
background-color: black;
`

const P = styled.p`
font-size: 32px;
padding-bottom: 10px;
`

const H2 = styled.p`
padding-bottom: 28px;
font-size: 40px;
font-weight: bold;
`

export default Banner;