import { useEffect, useState } from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [datas, setDatas] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

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
        .then(data => {console.log(data); setIsLoading(true); setDatas(data)})
        .catch(e => {
            console.log("error", e);
        });
}

    useEffect(() => {    
        if(isLoading === true && datas.message === "Login Succesfull"){
            sessionStorage.setItem("name", datas.data )
            sessionStorage.setItem("isLogedIn", true )
            setEmail("")
            setPassword("")
            navigate("/");
        }
}, [isLoading, datas])

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

export default Signin;