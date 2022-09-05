import styled from "styled-components"
import bannerImg from './Assests/bannerjpg.jpg'
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { UserContext } from "./UserContext";
import Signin from "./Signin";
import Signup from './Signup'

const Banner = () => {

  const {
    name, 
    isLogedIn, 
    setName, 
    setIsModalOpen, 
    isModalOpen, 
    setIsLogedIn,
    isRegistrationModalOpen,
    setIsuserLoginIn,
    isUserLoginIn
  } = useContext(UserContext);

  const navigate = useNavigate()

  const handleClick = () => {
      navigate("/");
  }
  const handleLogin = () => {
    if(name === null || isLogedIn === false){
      console.log("islogedin", isLogedIn)
      setIsModalOpen(true);
    }
}
// console.log(isModalOpen, "ismodal open ", isRegistrationModalOpen, "isRegistrationModalOpen")

  const handleLogout = () => {
    sessionStorage.setItem("isLogedIn", false)
    sessionStorage.removeItem("name")
    setIsuserLoginIn(false)
  }

  const handleFavorites =() => {
    navigate("/events");
  }

  useEffect(() => {
    setIsLogedIn(sessionStorage.getItem("isLogedIn"));
    setName(sessionStorage.getItem("name"));
  }, [isLogedIn, isUserLoginIn])

  // console.log("isLogedIn ",isLogedIn, "name ", name)

    return(
      <>
        <Main>
            <Logo onClick={handleClick}> 
              Events <br/>Master
            </Logo>
          <Favorites onClick={handleFavorites}>
            {(isLogedIn === true || name !== null) && "Favorites"}
          </Favorites>
          <Login onClick={handleLogin}>
            {(name === null || isLogedIn === false) && "Login"}
          </Login>
            {(isLogedIn === true || name !== null) && <Logout onClick={handleLogout}>Logout</Logout>}
          <BannerImg src={bannerImg} alt="banner" />
          <Heading>
            <H2>Let the fun begins</H2>
            <P>Your next best-night-ever is waiting.</P>
            <P>And we have the tickets.</P>
          </Heading>
        </Main>
        {(isModalOpen === true) && <Signin />}
        {(isRegistrationModalOpen === true) && <Signup />}
      </>
    )
}

const Main = styled.div`
  position: relative;
  margin-bottom: 20px;
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

const Logo = styled.p`
  cursor: pointer;
  color: white;
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 30px;
  font-family: 'Courier New', Courier, monospace;

  @media (max-width: 850px) {
    width: 70px;
  }
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

@media (max-width: 850px) {
  object-fit: cover;
  object-position: 0px 25%;
  height: 300px;
}

@media (max-width: 600px) {
  object-fit: cover;
  object-position: 0px 10%;
  height: 270px;
}
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

@media (max-width: 890px) {
  width: 60%;
  top: 25%;
  left: 20%;
  padding: 10px 0px;
}

@media (max-width: 600px) {
  width: 60%;
  top: 28%;
  left: 20%;
  padding: 10px 0px;
}
`

const P = styled.p`
  font-size: 25px;
  padding-bottom: 10px;

@media (max-width: 850px) {
    font-size: 18px;
}


@media (max-width: 600px) {
  font-size: 16px;
}
`

const H2 = styled.p`
  padding-bottom: 28px;
  font-size: 35px;
  font-weight: bold;

@media (max-width: 850px) {
    font-size: 28px;
}

@media (max-width: 600px) {
  font-size: 22px;
}
`

export default Banner;