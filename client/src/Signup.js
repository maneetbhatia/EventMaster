import { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from './UserContext';
import Loading from './LoadingPage'

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [datas, setDatas] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false)

    const{setIsRegistrationModalOpen, setIsModalOpen} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        let user;
        if(fullName !== "" &&
            email !== "" &&
            password !== "" &&
            confirmPassword !== "" &&
            password === confirmPassword ){
                user = {
                    _id: uuidv4(),
                    name: fullName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                };
                setLoading(true)
        }else{
            setLoading(false)
            setErrorMessage("password & confirm paswword must be same");
        }
        
        if(user !== undefined){
            fetch("/users", {
                method: "POST",
                headers: {"Accept": "application/json","Content-Type": "application/json"},
                body: JSON.stringify(user),
            }).then(res =>  res.json())
            .then(data => {console.log(data); setDatas(data)})
                .catch(e => {
                    console.log("error", e);
            });
        }
    }
    useEffect(() => {
        if(datas?.message === "register Succesfull" ){
            setFullName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            setIsRegistrationModalOpen(false)
            setIsModalOpen(true)
        }

        setLoading(false)
    }, [datas])

    const handleLogin = () => {
        setIsRegistrationModalOpen(false)
        setIsModalOpen(true)
    }

    const closeModal  = () => {
        setIsRegistrationModalOpen(false)
    }
    
    return( 
        <>
            <Main>
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
                        onChange={(e) => setPassword(e.target.value)} 
                    /><br />
                    <Input 
                        placeholder='Confirm Password' 
                        type="password" required 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    /><br />
                    {(!loading) ? <Submit>Signin</Submit> : <Submit><Loading /></Submit>}
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <P>Have account? please <Span onClick={handleLogin}>Login</Span></P>
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
    border: 3px silver solid;
    background-color: white;
    width: 40%;
    margin: auto;
    z-index: 2001;
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

const ErrorMessage = styled.p`
    color: red;
`

export default Signup;