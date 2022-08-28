import { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { UserContext } from './UserContext';

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [datas, setDatas] = useState(null)
    const {isLoading, setIsLoading } = useContext(UserContext);

    const navigate = useNavigate();

    const handleRegister = () => {
        navigate("/signup")
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
        .then(data => {console.log(data); setDatas(data)})
        .catch(e => {
            console.log("error", e);
        });
    }

    useEffect(() => {    
        if(datas?.message === "Login Succesfull"){
            sessionStorage.setItem("name", datas.data )
            sessionStorage.setItem("isLogedIn", true )
            setEmail("")
            setPassword("")
            setIsLoading(true)
            navigate("/")
        }
    }, [datas])



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
                        onChange={(e) => setPassword(e.target.value)} /><br />
                    <Submit>Signin</Submit>
                    {(datas?.status === 404) && <p>{datas?.message}</p>}
                <P>If you don't have account, please <Span onClick={handleRegister}>Register</Span></P>
                </Form>
            </Main>
        </>
    )
}

const Main = styled.div`
    margin: 40px 0px;
    padding: 10px;
    text-align: center;
`

const Form = styled.form`
    border: 3px silver solid;
    width: 40%;
    margin: auto;
    text-align: center;
    padding: 10px;
    border-radius: 15px;
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

export default Signin;