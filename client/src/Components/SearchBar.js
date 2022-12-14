import styled from "styled-components";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {
    const [value, setValue] = useState("");
    
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search/${value}`)
    }

    return(
        <Main>
            <Input value={value} placeholder="Search events by name..." onChange={(e) => {setValue(e.target.value)}} />
            <Button disabled={!value} onClick={handleSearch}>Search</Button>
            {value && <Span onClick={() => {setValue("")}}>X</Span>}
        </Main>
    )
}

const Main = styled.div`
    width: 80%;
    margin: auto;
    margin-bottom: 40px;
    position: relative;

    @media (max-width: 600px) {
        width: 90%;
        margin: auto;
        margin-bottom: 40px;
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
    position: relative;

    @media (max-width: 850px) {
        width: 80%;
    }

    @media (max-width: 525px) {
        width: 77%;
    }
`

const Button = styled.button`
    background-color: gray;
    color: whitesmoke;
    padding: 1.4% 3%;
    border-radius: 10px;
    margin-left: 1%;
    border: none;
    cursor: pointer;
`

const Span = styled.span`
    border: none;
    font-size: 18px;
    position: absolute;
    top: 26%;
    right: 16%;
    cursor: pointer;

    &:hover{
        color: red;
    }

    @media (max-width: 1250px) {
        top: 23%;
        right: 16%;
    }

    @media (max-width: 1100px) {
        top: 22%;
        right: 16%;
    }

    @media (max-width: 1000px) {
        top: 20%;
        right: 16%;
    }
    
    @media (max-width: 860px) {
        top: 17.5%;
        right: 19%;
    }

    @media (max-width: 525px) {
        top: 15%;
        right: 23%;
    }
`

export default SearchBar;