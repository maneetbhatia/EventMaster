import styled from "styled-components";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {
    const [value, setValue] = useState(null);
    
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search/${value}`)
    }

    return(
        <Main>
            <Input placeholder="Search events by name, artist, venue..." onChange={(e) => {setValue(e.target.value)}} />
            <Button onClick={handleSearch}>Search</Button>
        </Main>
    )
}

const Main = styled.div`
width: 80%;
margin: auto;
margin-top: 40px;

@media (max-width: 850px) {
    width: 90%;
    margin: auto;
    margin-top: 40px;
}

@media (max-width: 600px) {
    width: 90%;
    margin: auto;
    margin-top: 40px;
    /* background-color: red; */
}
`

const Input = styled.input`
padding: 1%;
width: 83%;
background-color: white;
font-weight: bolder;
border-radius: 10px;
outline: none;
font-size: 15px;

@media (max-width: 850px) {
    width: 80%;
}

@media (max-width: 510px) {
    width: 75%;
}
`

const Button = styled.button`
background-color: black;
color: white;
padding: 1.2% 3%;
border-radius: 10px;
margin-left: 1%;
cursor: pointer;
`

export default SearchBar;