import styled from 'styled-components'

const Footer = () => {
    return (
        <Main>
            <Wrapper>
                <div>
                    <UL>Categories</UL>
                    <LI>Comedy</LI>
                    <LI>Concert</LI>
                    <LI>Sports</LI>
                    <LI>Broadway Shows</LI>
                    <LI>Family Entertainment</LI>
                    <LI>WWE</LI>
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
                    <UL>Venues</UL>
                    <LI>Bad Bunny</LI>
                    <LI>Elton John</LI>
                    <LI>Lady Gaga</LI>
                    <LI>Justin Bieber</LI>
                    <LI>Daddy Yankee</LI>
                    <LI>Billy Joel</LI>
                </div>
                <div>
                    <UL>Contact Us</UL>
                    <LI style={{marginTop: "20px"}}>Location: 1455 de Maisonneuve Blvd W,</LI>
                    <LI>Montreal, Quebec H#G 1M8, Canada</LI>
                    <LI style={{marginTop: "30px"}}>Phone: 123-123-1230</LI>
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
    grid-template-columns: 23% 23% 23% 30%;
    margin-top: 40px;
    /* grid-gap: 4%; */
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