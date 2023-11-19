import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Error, Input, Form, Switcher, Title, Wrapper } from '../components/auth-components';
import GithubButton from '../components/github-btn';


export default function createAccount() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPasswrod] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name === "name") {
            setName(value);
        }
        else if (name === 'password') {
            setPasswrod(value);
        }
        else if (name === 'email') {
            setEmail(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        if (name === "" || password === "" || email === "" || isLoading) return;
        try {
            setIsLoading(true)
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            })
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
            <Title>Join 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input name='name' onChange={onChange} value={name} placeholder='name' type='text' required />
                <Input name='email' onChange={onChange} value={email} placeholder='email' type='email' required />
                <Input name='password' onChange={onChange} value={password} placeholder='password' type='password' required />
                <Input type='submit' value={isLoading ? "Loading..." : "Create Account"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
              Already have an account? <Link to="/login">Login &rarr;</Link>
            </Switcher>
            <GithubButton />
        </Wrapper>
    )
}