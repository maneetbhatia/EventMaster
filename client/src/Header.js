import styled from "styled-components"

const Header = () => {
    return(
        <Main>
            <H1>Events</H1>
            <Ul>
                <Li>Comedy</Li>
                <Li>Sports</Li>
                <Li>Music</Li>
                <Li>Concert</Li>
            </Ul>
        </Main>
    )
}

export default Header;

const Main = styled.div`
background-color: black;
color: white;
display: flex;
`

const H1 = styled.h1`
float: left;
width: 20%;
padding: 10px 0 0 20px ;
`

const Ul = styled.ul`
list-style: none;
padding: 20px;
width: 80%;
`

const Li = styled.li`
float: right;
margin-left: 10%;
font-size: 20px;
`