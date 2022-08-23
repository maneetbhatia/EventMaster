import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Banner from './Banner'
import { useState } from "react"
import LoginLogo from './Assests/login logopng.png'

const Header = () => {
    const [showCategories, setShowCategories] = useState(false);
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/");
    }

    const getCategory = (e) => {
        navigate(`/category/${e.target.innerText}`);
    }
    
    const handleMenu =() => {
        setShowCategories(true);
    }
    
    const handleMenus = () => {
        setShowCategories(false);
    }

    return(
        <Wrapper>
        <Main>
            <H1 onClick={handleClick}>Events</H1>
            <Categories>
                <P 
                    onMouseOver={handleMenu}
                    >
                    Login
                </P>
                <Menu onMouseLeave={handleMenus} showCategories={showCategories}>
                    <Category onClick={getCategory}>Concerts</Category>
                    <Category onClick={getCategory}>NFL</Category>
                    <Category onClick={getCategory}>MLB</Category>
                    <Category onClick={getCategory}>NBA</Category>
                    <Category onClick={getCategory}>NHL</Category>
                    <Category onClick={getCategory}>MLS</Category>
                    <Category onClick={getCategory}>Broadway</Category>
                    <Category onClick={getCategory}>Comedy</Category>
                    <Category onClick={getCategory}>NCAA</Category>
                    <Category onClick={getCategory}>NCAA BB</Category>
                    <Category onClick={getCategory}>NCAA FB</Category>
                    <Category onClick={getCategory}>WWE</Category>
                    <Category onClick={getCategory}>Tennis</Category>
                    <Category onClick={getCategory}>Golf</Category>
                </Menu>
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

const Img = styled.img`
background-color: black;
width: 20%;
`

const H1 = styled.h1`
float: left;
width: 95%;
cursor: pointer;
padding-top: 15px;
`

const Categories = styled.div`
margin: 22px 0px 0px 0px;
position: relative;
`

const Menu = styled.div`
position: absolute;
top: 30px;
background-color: white;
padding: .75rem;
color: black;
width: 100%;
border-radius: .25rem;
opacity: ${props => (props.showCategories ? 1 : 0)};
`

const Category = styled.p`
padding: 1%;
font-size: 18px;
cursor: pointer;

&:hover{
    background-color: grey;
    color: white;
}

`

const P = styled.span`
display: right;
margin-left: 10%;
font-size: 20px;
cursor: pointer;

&:hover{
    border-bottom: 2px solid white;
}
`
