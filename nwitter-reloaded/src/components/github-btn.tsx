import { GithubAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import React from 'react'
import styled from 'styled-components'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Button = styled.span`
    background-color: white;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: black;
    margin-top: 50px;
    cursor: pointer;
    opacity: 0.8;
    width: 100%;
`;

const Logo = styled.img`
    height: 25px;
`;

function GithubButton() {
    const navigate = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/")
        } catch (error) {
            console.log(error)
        }
   
    }
    return (
        <Button onClick={onClick}>
            <Logo src="/github-mark.svg" />
            Continue with Github
        </Button>
    )
}

export default GithubButton