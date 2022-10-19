import styled from "styled-components"

const Pagination = ({length, handleIncrement, handleDecrement}) =>{
    return(
        <Main>
            <Button onClick={handleDecrement}>Prev</Button>
            <Span>{length?.page} of {Math.ceil(length?.total/32)}</Span>
            <Button onClick={handleIncrement}>Next</Button>
        </Main>
    )
}

export default Pagination;

const Main = styled.div`
    width: fit-content;
    margin: auto;
    margin-bottom: 40px;
`

const Span = styled.span`
    margin: 0px 10px;
`

const Button = styled.button`
    font-size: 18px;
    padding: 10px 30px;
    background-color: white;
    cursor: pointer;
    border-radius: 50px;
    color: grey;
    border: 1px solid grey;

    &:hover{
        background-color: whitesmoke;
    }
`