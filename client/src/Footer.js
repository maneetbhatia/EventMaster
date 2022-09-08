import styled from 'styled-components'
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const handleCategories = (e) => {
        navigate(`/category/${e.target.innerText}`)
    }

    return (
        <Main>
            <Wrapper>
                <div>
                    <UL>Categories</UL>
                    <LI onClick={handleCategories}>Comedy</LI>
                    <LI onClick={handleCategories}>Concert</LI>
                    <LI onClick={handleCategories}>Sports</LI>
                    <LI onClick={handleCategories}>Broadway Shows</LI>
                    <LI onClick={handleCategories}>Family Entertainment</LI>
                    <LI onClick={handleCategories}>WWE</LI>
                </div>
                <div>
                    <UL>Artists</UL>
                    <LI>Bad Bunny</LI>
                    <LI>Elton John</LI>
                    <LI>Lady Gaga</LI>
                    <LI>Justin Bieber</LI>
                    <LI>Daddy Yankee</LI>
                    <LI>Billy Joel</LI>
                </div>
                <div>
                    <UL>Social</UL>
                    <LI>Twitter</LI>
                    <LI>Facebook</LI>
                    <LI>Pinterest</LI>
                </div>
                <div>
                    <UL>Contact Us</UL>
                    <p style={{marginTop: "20px"}}>Location: 123 Main Street</p>
                    <p>Montreal, Quebec Canada</p>
                    <p style={{marginTop: "30px"}}>Phone: 123-123-1230</p>
                </div>
            </Wrapper>
            <P>&copy; 2022 EventMaster, All rights reserved.</P>
        </Main>
    )
}

const Main = styled.div`
    background-color: black;
    color: white;
`

const Wrapper = styled.div`
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-columns: 25% 25% 25% 30%;
    margin-top: 40px;
    padding: 4%;
`

const UL = styled.h3`
    font-size: 20px;
    margin-bottom: 20px;
`

const LI = styled.p`
    color: silver;
    margin-bottom: 13px;
    cursor: pointer;
    width: fit-content;

    &:hover{
        color: white;
    }
`

const P = styled.p`
    padding: 1%;
    text-align: center;
    background-color: black;
    color: white;
    text-align: center;
    border-top: 1px solid white;
`

export default Footer;