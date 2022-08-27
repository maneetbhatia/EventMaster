import { useEffect, useState } from 'react';
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

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
        
        if(errorMessage !== null){
                fetch("/users", {
                    method: "POST",
                    headers: {"Accept": "application/json","Content-Type": "application/json"},
                    body: JSON.stringify(user),
                }).then(res =>  res.json())
                .catch(e => {
                    console.log("error", e);
                });
            }

    // empty inputs after submit
    // console.log(fullName, email, password, confirmPassword)
    
    // setFullName("");
    // setEmail("")
    // setPassword("")
    // setConfirmPassword("")

}

    return( 
        <>
            <Main>
                <Form onSubmit={handleSubmit}>
                    <h1>Signup</h1>
                    <Input placeholder='name' type="text" required onChange={(e) => setFullName(e.target.value)}></Input><br />
                    <Input placeholder='emial' type="email" required onChange={(e) => setEmail(e.target.value)}></Input><br />
                    <Input placeholder='password' type="password" required onChange={(e) => setPassword(e.target.value)}></Input><br />
                    <Input placeholder='confirm password' type="password" required onChange={(e) => setConfirmPassword(e.target.value)}></Input><br />
                    <Submit>Submit</Submit>
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

export default Signup;