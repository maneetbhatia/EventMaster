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
            <Span onClick={() => {setValue("")}}>x</Span>
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
    background-color: black;
    color: white;
    padding: 1.2% 3%;
    border-radius: 10px;
    margin-left: 1%;
    cursor: pointer;
`

const Span = styled.span`
  position: absolute;
  border: none;
  font-size: 18px;
  top: 4px;
  right: 100px;
  cursor: pointer;

  &:hover{
    color: red;
  }
`

export default SearchBar;