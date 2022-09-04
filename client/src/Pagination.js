import styled from "styled-components"

const Pagination = ({length, handleIncrement, handleDecrement}) =>{
    return(
        <Main>
            <Button onClick={handleDecrement}>Prev</Button>
            <Span>{length?.page} of {length?.total}</Span>
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
    padding: 10px 20px;
    background-color: white;
    cursor: pointer;
    border-radius: 15px;
`