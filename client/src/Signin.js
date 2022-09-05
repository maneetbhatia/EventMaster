import { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { UserContext } from './UserContext';

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [datas, setDatas] = useState(null)
    const {
        isRegistrationModalOpen, 
        setIsRegistrationModalOpen,
        setIsLoading,
        isModalOpen,
        setIsModalOpen,
        isLogedIn,
        name,
        setIsLogedIn,
        isUserLoginIn, setIsuserLoginIn
    } = useContext(UserContext);

    const navigate = useNavigate();

    const handleRegister = () => {
        setIsRegistrationModalOpen(true);
        setIsModalOpen(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        let user;
        if(email !== "" && password !== ""){
            user = {
                email: email,
                password: password
            };
        }

        await fetch("/user", {
            method: "POST",
            headers: {"Accept": "application/json","Content-Type": "application/json"},
            body: JSON.stringify(user),
        }).then(res =>  res.json())
        .then(data => {
            // console.log(data); 
            setDatas(data)})
        .catch(e => {
            console.log("error", e);
        });
    }

    useEffect(() => {    
        if(datas?.message === "Login Succesfull"){
            sessionStorage.setItem("name", datas.data )
            sessionStorage.setItem("isLogedIn", true )
            setIsuserLoginIn (true)
            setEmail("")
            setPassword("")
            setIsLoading(true)
            navigate("/")
            setIsModalOpen(false)
        }
    }, [datas])

    const closeModal  = () => {
        setIsModalOpen(false)
    }

    return( 
        <>
            <Main>
                <Form onSubmit={handleSubmit}>
                    <h1>Signin</h1>
                    <Input 
                        placeholder='Email' 
                        type="email" required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <Input 
                        placeholder='Password' 
                        type="password" required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    /><br />
                    <Submit>Signin</Submit>
                    {(datas?.status === 404) && <p>{datas?.message}</p>}
                    <P>If you don't have account, please <Span onClick={handleRegister}>Register</Span></P>
                <Close onClick={closeModal}>X</Close>
                </Form>
            </Main>
        </>
    )
}

const Main = styled.div`
    width: 100%;
    background-color: rgba(255,255,255,0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
`

const Form = styled.form`
    text-align: center;
    background-color: white;
    border: 3px silver solid;
    width: 40%;
    text-align: center;
    padding: 30px;
    border-radius: 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 900px) {
        width: 60%;
    }

    @media (max-width: 600px) {
        width: 90%;
    }
`

const Input = styled.input`
    width: 90%;
    padding: 2%;
    margin: 10px;
    border: 1px solid grey;
`

const Submit = styled.button`
    width: 94.5%;
    margin: auto;
    padding: 10px 60px;
    margin: 10px;
    color: black;
    background-color: white;
    cursor: pointer;
`

const P = styled.p`
    margin-top: 20px;
`

const Span = styled.span`
    cursor: pointer;
    color: green;

    &:hover{
        color: limegreen;
    }
`

const Close = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    padding: 1%;
    border: none;
    cursor: pointer;

    &:hover{
        color: red;
    }
`

export default Signin;