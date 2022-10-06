import styled from 'styled-components'
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const handleCategories = (e) => {
        navigate(`/category/${e.target.innerText}`)
    }

    const handleArtists = (e) => {
        console.log(e.target.innerText)
        navigate(`/search/${e.target.innerText}`)
    }

    return (
        <Main>
            <Wrapper>
                <div>
                    <UL>CATEGORIES</UL>
                    <LI onClick={handleCategories}>Comedy</LI>
                    <LI onClick={handleCategories}>Concert</LI>
                    <LI onClick={handleCategories}>Sports</LI>
                    <LI onClick={handleCategories}>Broadway Shows</LI>
                    <LI onClick={handleCategories}>Family Entertainment</LI>
                    <LI onClick={handleCategories}>WWE</LI>
                </div>
                <div>
                    {/* SEND TO SEARCH */}
                    <UL>ARTISTS</UL>
                    <LI onClick={handleArtists}>Bad Bunny</LI>
                    <LI onClick={handleArtists}>Daddy Yankee</LI>
                    <LI onClick={handleArtists}>Elton John</LI>
                    <LI onClick={handleArtists}>Lady Gaga</LI>
                    <LI onClick={handleArtists}>Justin Bieber</LI>
                    <LI onClick={handleArtists}>Harry Styles</LI>

                </div>
                <div>
                    <UL>SOCIAL</UL>
                    <LI>Twitter</LI>
                    <LI>Facebook</LI>
                    <LI>Pinterest</LI>
                </div>
                <div>
                    <UL>CUSTOMER SERVICE</UL>
                    <p style={{marginTop: "20px", color:"silver"}}>support@eventmaster.ca</p>
                    <p style={{marginTop: "10px", color:"silver"}}>1-800-EVENTMASTER</p>
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

    @media (max-width: 800px) {
        grid-template-columns: 50% 50%;
    }

    @media (max-width: 430px) {
        grid-template-columns: 100%;
        text-align: center;
        font-size: 22px;
    }
`

const UL = styled.h3`
    font-size: 20px;
    margin-bottom: 20px;

    @media (max-width: 800px) {
        margin-top: 20px;
    }

    @media (max-width: 430px) {
        font-size: 25px;
    }
`

const LI = styled.p`
    color: silver;
    margin-bottom: 13px;
    cursor: pointer;

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