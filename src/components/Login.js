import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import { auth } from "../firebase";

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Logo = styled.img`
  margin: 20px auto;
  object-fit: contain;
  width: 100px;
`;

const LoginContainer = styled.div`
  width: 300px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid lightgray;
  padding: 20px;

  > h1 {
    font-weight: 500;
    margin-bottom: 20px;
  }

  > form > h5 {
    margin-bottom: 5px;
  }

  > form > input {
    height: 30px;
    margin-bottom: 10px;
    background-color: white;
    width: 98%;
  }

  > p {
    margin: 15px;
    font-size: 12px;
  }
`;

const LogInButton = styled.button`
  background: #f0c14b;
  border-radius: 2px;
  width: 100%;
  height: 30px;
  border: 1px solid;
  margin-top: 10px;
  border-color: #a88734 #9c7e31 #846a29;
`;

const SignUpButton = styled.button`
  border-radius: 2px;
  width: 100%;
  height: 30px;
  border: 1px solid;
  margin-top: 10px;
  border-color: darkgray;
`;

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <Container>
      <Link to="/">
        <Logo
          src="http://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <LoginContainer>
        <h1>Sign-in</h1>
        <form>
          <h5>e-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LogInButton type="submit" onClick={logIn}>
            Sign In
          </LogInButton>
        </form>
        <p>
          By signing-in you agree to Amazon's FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <SignUpButton onClick={signUp}>Create your Amazon Account</SignUpButton>
      </LoginContainer>
    </Container>
  );
}

export default Login;
