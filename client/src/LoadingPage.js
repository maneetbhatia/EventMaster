import styled, { keyframes }from 'styled-components';
import eventLoadingIcon from "./Assests/Loading.png"

const LoadingPage = () => {

    return (
        <Wrapper>
            <Icon src={eventLoadingIcon} alt="SHOPFIT loading icon" />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const flash = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(359deg); }
`;

const Icon = styled.img`
    width: 190px;
    animation: ${flash} 1.5s linear infinite;
`;

export default LoadingPage;