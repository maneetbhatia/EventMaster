import styled from "styled-components";
import  {useNavigate} from 'react-router-dom';
import LoadingPage from "./LoadingPage";
import { useContext } from "react";
import gif404 from "./Assests/kGwR3uDrUKPI.gif"

// declare errorPage function
const ErrorPage = () => {
    const navigate = useNavigate()

    // declare handleClick function which redirects user to homepage
    const handleClick = () => {
        navigate("/");
    }
    
    return (
        <Div>
            <Img src={gif404} alt="broken chain" />
            <H1>Page Not Found...</H1>
            <H3>The page you requested does not exist.</H3>
            <Button onClick={handleClick}>Categories</Button>
        </Div>
    )
    
}

export default ErrorPage;

const Div = styled.div`
    width: 67%;
    margin: auto;
    text-align: center;

    @media (max-width: 950px) {
        padding: 100px;
    }

    @media (max-width: 650px) {
        padding: 50px;
    }

    @media (max-width: 370px) {
        padding: 20px;
    }
`;

const Img = styled.img`
    width: 300px;
    object-fit: cover;
    object-position: 0 0;
    height: 150px;
`;

const H1 = styled.p` text-align: center;
    padding: 40px;
    font-size: 25px;
`;

const H3 = styled.h3`
    padding: 20px;
    text-align: center;
    font-size: 24px;
`;

const Button = styled.button`
    border: none;
    cursor: pointer;
    /* color: white; */
    font-size: 20px;
    padding: 2% 5%;
    margin: 20px 0px;
    border-radius: 35px;
    box-shadow: none;
    justify-content: center;

    &:hover{
        box-shadow: 2px 2px 5px 1px #969696;
    }
`;