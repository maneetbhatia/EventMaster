import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import SearchBar from './SearchBar'

const Header = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/");
    }
    return(
        <Wrapper>
        <Main>
            <H1 onClick={handleClick}>Events</H1>
            <Ul>
                <Li>Comedy</Li>
                <Li>Sports</Li>
                <Li>Music</Li>
                <Li>Concert</Li>
            </Ul>
        </Main>
            <SearchBar />
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
width: 20%;
cursor: pointer;
`

const Ul = styled.ul`
list-style: none;
padding: 10px 0px 0px 0px;
width: 90%;
`

const Li = styled.li`
float: right;
margin-left: 10%;
font-size: 20px;
cursor: pointer;

&:hover{
    border-bottom: 2px solid white;
}
`