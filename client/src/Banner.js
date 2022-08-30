import styled from "styled-components"
import bannerImg from './Assests/bannerjpg.jpg'
import { useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { UserContext } from "./UserContext";

const Banner = () => {
  const [isLogedIn , setIsLogedIn] = useState(null);
  const [name, setName] = useState(null)
  const {isLoading, setIsLoading } = useContext(UserContext);

  const navigate = useNavigate()

  const handleClick = () => {
      navigate("/");
  }

  const handleLogin = () => {
    navigate('/signin')
}

  const handleLogout = () => {
    sessionStorage.setItem("isLogedIn", false)
    sessionStorage.removeItem("name")
    setIsLoading(false)
  }

  const handleFavorites =() => {
    navigate("/events");
  }

  useEffect(() => {
    setIsLogedIn(sessionStorage.getItem("isLogedIn"));
    setName(sessionStorage.getItem("name"));
  }, [isLoading])
  console.log(isLogedIn, name, isLoading)

    return(
      <>
      <Main>
        <H1 onClick={handleClick}>Events</H1>
        <Favorites onClick={handleFavorites}>
          {(isLogedIn === true || name !== null) && "Favorites"}
        </Favorites>
        <Login onClick={handleLogin}>
          {(isLogedIn === true || name !== null) ? "W": "Login"}
        </Login>
        <Logout onClick={handleLogout}>
          {(isLogedIn === true || name !== null) && "Logout"}
        </Logout>
        <BannerImg src={bannerImg} alt="banner" />
        <Heading>
          <H2>Let the fun begins</H2>
          <P>Your next best-night-ever is waiting.</P>
          <P>And we have the tickets.</P>
        </Heading>
        </Main>
      </>
    )
}

const Main = styled.div`
position: relative;
`

const Login = styled.p`
font-size: 20px;
cursor: pointer;
color: white;
position: absolute;
top: 15px;
right: 30px;
padding: 7px 10px;
background-color: grey;
`

const Logout = styled.p`
font-size: 20px;
cursor: pointer;
color: white;
position: absolute;
top: 15px;
right: 30px;
padding: 7px 10px;
background-color: grey;
`

const Favorites = styled.p`
position: absolute;
top: 21px;
right: 150px;
color: greenyellow;
font-size: 20px;
cursor: pointer;
`

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
top: 18%;
left: 28%;
width: 45%;
color: white;
text-align: center;
background-color: black;
`

const P = styled.p`
font-size: 25px;
padding-bottom: 10px;
`

const H1 = styled.span`
cursor: pointer;
color: white;
position: absolute;
top: 15px;
left: 30px;
font-size: 35px;
`

const H2 = styled.p`
padding-bottom: 28px;
font-size: 35px;
font-weight: bold;
`

export default Banner;