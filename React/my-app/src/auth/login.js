import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://localhost:3005/login',
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify({
              email: email,
              password: password,
            })
          })
        .then(res => { return res.json()})
        .then(data => {
            
            if (data.status === 200) {
    
                setEmail("");
                setPassword("");
                 function redirect(){
                    
                    navigate("/Bank", { state: { acc: data.message } });
                    
                  };
                  redirect();
              }
            })
        .catch(err => console.log(err))
        };

    const gotoSignUpPage = () => navigate("/register");
    return (
        <div className='login__container'>
            <h2>Login </h2>
            <form className='login__form' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    id='email'
                    name='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    minLength={0}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='loginBtn'>SIGN IN</button>
                <p>
                    Don't have an account?{" "}
                    <span className='link' onClick={gotoSignUpPage}>
                        Sign up
                    </span>
                </p>
                </form>
        </div>
    );
};

export default Login;