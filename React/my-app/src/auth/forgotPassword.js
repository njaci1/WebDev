// A single input field form for the user to enter their email address. 
// The user will receive an email with a link to reset their password. The link will be valid for 24 hours.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://localhost:3005/forgotPassword',
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify({
              email: email,
            })
          })
        .then(res => { return res.json()})
        .then(data => {
            
            if (data.status === 200 && data.message !== "invalidLogin") {
    
                setEmail("");
                setMessage("A link to reset your password has been sent to your email address.");

              }else{
                
                alert("Invalid email address. Use the email you used to register.");
              }
            })
        .catch(err => console.log(err))
        };

    
    return (
        <div className='login__container'>
            <h2>Reset Password </h2>
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

                <div className="message">{message ? <p style={{color:"red"}}>{message}</p> : null}</div>
                <button className='loginBtn'>Submit</button>
                </form>
        </div>
    );
};

export default ForgotPassword;