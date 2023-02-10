// a 3 input form to reset password.
// the user will enter their email, new password and confirm password.
// another input field will appear after submiting the password asking user to input sms code sent to their phone number. -- this is will be implemented later.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://localhost:3005/resetPassword',
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify({
              
              password: password,
            })
          })
        .then(res => { return res.json()})
        .then(data => {
            
            if (data.status === 200 && data.message !== "invalidLogin") {
                setPassword("");
                setMessage("Password reset successful click here to login");

              }else{
                
                // alert("Invalid Username or Password please try again");
              }
            })
        .catch(err => console.log(err))
        };

    const gotoLogin = () => navigate("/login");
    return (
        <div className='login__container'>
            <h2>Reset Password </h2>
            <form className='login__form' onSubmit={handleSubmit}>
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
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password1'
                    minLength={0}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="message">{message ? 
                <p style={{color:"green"}}>{message} {" "} 
                <span className='link' onClick={gotoLogin}>
                        Login
                    </span>
                </p>
                : null}</div>
                <button className='loginBtn'>Reset Password</button>

                </form>
        </div>
    );
};

export default ResetPassword;