import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Banner from './Banner';

const Header = () => {
    const [isLogedIn , setIsLogedIn] = useState(null);
    const [name, setName] = useState(null)
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/");
    }
    
    const handleFavorites =() => {
        navigate("/events");
    }

    const handleLogin = () => {
        navigate('/signin')
    }


    // FIX LOGOUT```````````````````
    const handleLogout = () => {
        sessionStorage.setItem("isLogedIn", false)
        sessionStorage.removeItem("name")
    }

    useEffect(() => {
        setIsLogedIn(sessionStorage.getItem("isLogedIn"));
        setName(sessionStorage.getItem("name"));
    }, [])
    console.log(isLogedIn, name)

    return(
        <Wrapper>
        <Main>
            <H1 onClick={handleClick}>Events</H1>
            <Categories>
                <Favorites onClick={handleFavorites}>
                    {(isLogedIn === true || name !== null) && "Favorites"}
                </Favorites>
                <P onClick={handleLogin}>
                    {(isLogedIn === true || name !== null) ? "W": "Login"}
                </P>
                <P onClick={handleLogout}>
                {(isLogedIn === true || name !== null) && "Logout"}
                </P>
            </Categories>
        </Main>
        <Banner />
        </Wrapper>
    )
}

export default Header;

const Wrapper = styled.div`
background-color: black;
padding: 1%;
padding: 1% 3%;
`

const Main = styled.div`
color: white;
display: flex;
`

const H1 = styled.h1`
float: left;
margin-right: 45%;
cursor: pointer;
padding-top: 15px;
`

const Categories = styled.div`
margin: 22px 0px 0px 0px;
position: relative;
`

const P = styled.span`
display: right;
margin-left: 10%;
font-size: 20px;
cursor: pointer;
`

const Favorites = styled.span`
display: right;
margin-right: 30%;
font-size: 20px;
cursor: pointer;
color: greenyellow;
`
