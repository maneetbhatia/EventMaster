import styled from "styled-components";
const SearchBar = () => {
    return(
        <Main>
        <Input placeholder="Search events by name, artist, venue..." />
        </Main>
    )
}

const Main = styled.div`
/* width: 95%;
margin: auto; */
`

const Input = styled.input`
position: absolute;
top: 300px;
left: 280px;
padding: 2%;
margin-top: 3%;
width: 50%;
background-color: white;
font-weight: bolder;
border-radius: 10px;
outline: none;
font-size: 15px;
`

export default SearchBar;