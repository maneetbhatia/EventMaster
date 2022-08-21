import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import SearchBar from './SearchBar'
import Banner from './Banner'

const Header = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/");
    }

    const getCategory = (e) => {
        navigate(`/category/${e.target.innerText}`);
    }
    return(
        <Wrapper>
        <Main>
            <H1 onClick={handleClick}>Events</H1>
            <SearchBar />
            <Categories>
                <P>Categories</P>
                <Menu>
                    <Category onClick={getCategory}>Comedy</Category>
                    <Category onClick={getCategory}>Sports</Category>
                    <Category onClick={getCategory}>Music</Category>
                    <Category onClick={getCategory}>Music</Category>
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

const H1 = styled.h1`
float: left;
width: 20%;
cursor: pointer;
padding-top: 15px;
`

const Categories = styled.div`
margin: 22px 0px 0px 0px;
position: relative;
&:focus{
    opacity: 1;
}
`

const Menu = styled.div`
position: absolute;
top: 30px;
background-color: white;
padding: .75rem;
color: black;
width: 100%;
border-radius: .25rem;
opacity: 1;
`

const Category = styled.p`
padding: 1%;
font-size: 18px;

&:hover{
    background-color: grey;
    color: white;
}

`

const P = styled.span`
float: right;
margin-left: 10%;
font-size: 20px;
cursor: pointer;

&:hover{
    border-bottom: 2px solid white;
}
`
