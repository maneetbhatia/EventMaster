import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Banner from './Banner'
import { useState } from "react"

const Header = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/");
    }
    
    const handleFavorites =() => {
        navigate("/events");
    }


    return(
        <Wrapper>
        <Main>
            <H1 onClick={handleClick}>Events</H1>
            <Categories>
                <Favorites onClick={handleFavorites}>
                    Favorites
                </Favorites>
                <P>
                    Login
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
margin-right: 75%;
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
