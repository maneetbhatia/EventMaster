import styled from "styled-components";
const SearchBar = () => {
    return(
        <Main>
        <Input placeholder="Search events by name, artist, venue..." />
        </Main>
    )
}

const Main = styled.div`
width: 60%;
margin: auto;
`

const Input = styled.input`
padding: 1%;
margin-top: 2%;
width: 100%;
`

export default SearchBar;