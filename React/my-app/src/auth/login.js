import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
// import userContext  from "../userContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    // const {setAcc} = useContext(userContext);

    // const setAccWithNavigation = (value) => {
    //     setAcc(value);
    //     navigate("/Bank");}
    

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
            
            if (data.status === 200 && data.message !== "invalidLogin") {
                setEmail("");
                setPassword("");
                // setAcc(data.message);
                navigate('/bank',{state:{acc:data.message.customer_acc, phoneNumber:data.message.phoneNumber}});
                
                // setAccWithNavigation(data.message);

              }else{
                setMessage("Invalid Username or Password please try again or click here to reset password");
                // alert("Invalid Username or Password please try again");
              }
            })
        .catch(err => console.log(err))
        };

    const gotoSignUpPage = () => navigate("/register");
    const forgotPassword = () => navigate("/forgotPassword");
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
                <div className="message">{message ? 
                <p style={{color:"red"}}>{message} {" "} 
                <span className='link' onClick={forgotPassword}>
                        Reset Password
                    </span>
                </p>
                 : null}</div>
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