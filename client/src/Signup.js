import { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from "react-router-dom";
import { UserContext } from './UserContext';

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [datas, setDatas] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);

    const{isLoading, setIsLoading, setIsRegistrationModalOpen, setIsModalOpen} = useContext(UserContext)

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let user;
        if(fullName !== "" &&
            email !== "" &&
            password !== "" &&
            confirmPassword !== "" ){
                user = {
                    _id: uuidv4(),
                    name: fullName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                };
        }else{
            setErrorMessage("error");
        }
        // console.log(errorMessage)
        
        if(errorMessage === null){
            fetch("/users", {
                method: "POST",
                headers: {"Accept": "application/json","Content-Type": "application/json"},
                body: JSON.stringify(user),
            }).then(res =>  res.json())
            .then(data => {console.log(data); setIsLoading(false); setDatas(data)})
                .catch(e => {
                    console.log("error", e);
            });
        }

        if(isLoading || datas?.message === "register succesfull"){
            setFullName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            setIsRegistrationModalOpen(false)
            setIsModalOpen(true)
        }
    }

    const handleLogin = () => {
        setIsRegistrationModalOpen(false)
        setIsModalOpen(true)
    }
    
    return( 
        <>
            {/* <Main> */}
                <Form onSubmit={handleSubmit}>
                    <h1>Signup</h1>
                    <Input 
                        placeholder='Full Name' 
                        type="text" required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    /><br />
                    <Input 
                        placeholder='Email' 
                        type="email" required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} /><br />
                    <Input 
                        placeholder='Password' 
                        type="password" required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} /><br />
                    <Input 
                        placeholder='Confirm Password' 
                        type="password" required 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} /><br />
                    <Submit>Submit</Submit>
                    <P>Have account? please <Span onClick={handleLogin}>Login</Span></P>
                </Form>
            {/* </Main> */}
        </>
    )
}

// const Main = styled.div`
//     margin: 40px 0px;
//     padding: 10px;
//     text-align: center;
// `

const Form = styled.form`
    border: 3px silver solid;
    background-color: white;
    width: 40%;
    margin: auto;
    z-index: 2001;
    text-align: center;
    padding: 10px;
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

export default Signup;