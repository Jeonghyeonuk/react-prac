import React, { useState } from 'react'
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Error, Input, Form, Switcher, Title, Wrapper } from '../components/auth-components'
import GithubButton from '../components/github-btn';


export default function login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPasswrod] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
   
        if (name === 'password') {
            setPasswrod(value);
        }
        else if (name === 'email') {
            setEmail(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        if (password === "" || email === "" || isLoading) return;
        try {
            setIsLoading(true)
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            if (error instanceof FirebaseError) {
                setError(error.message);
                console.log (error.code, error.message)
            }
        }
        finally {
            setIsLoading(false)
        }

        console.log(name, email, password)
    }

    return (
        <Wrapper>
            <Title>Login 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input name='email' onChange={onChange} value={email} placeholder='email' type='email' required />
                <Input name='password' onChange={onChange} value={password} placeholder='password' type='password' required />
                <Input type='submit' value={isLoading ? "Loading..." : "Login"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
              Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
            </Switcher>
            <GithubButton />
        </Wrapper>
    )
}