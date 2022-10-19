import styled, { keyframes }from 'styled-components';

const LoadingPage = () => {

    return (
        <Icon> </Icon>
    )
}

const flash = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate( 360deg); }
`;

const Icon = styled.div`
    width: 1rem;
    height: 1rem;
    margin: auto;
    border: dotted 0.5rem grey;
    border-radius: 50%;
    animation: ${flash} 1s linear infinite;
`;

export default LoadingPage;