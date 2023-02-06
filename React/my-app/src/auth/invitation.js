import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";




const Invitation = () => {
    const navigate = useNavigate();
    const [tel, setTel] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ref, setRef] = useState("");
    const [message, setMessage] = useState("");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    var inviter = queryParams.get('inviter');
    
    console.log(inviter);

      let handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://localhost:3005/register',
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
                tel: tel,
                ref: inviter,
            })
          })
        .then(res => { return res.json()})
        .then(data => {
            
            if (data.status === 200) {
                setName("");
                setEmail("");
                setPassword("");
                setRef("");
                setTel("");
                setMessage("User created successfully" + data.message);

                 function redirect(){
                    
                    navigate("/Bank", { state: { acc: data.message } });
                    
                  };
                  redirect();
              }
            })
        .catch(err => console.log(err))
        };

    const gotoLoginPage = () => navigate("/");
    return (
        <div className='signup__container'>
            <h2>Sign up </h2>
            <form className='signup__form' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email Address</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='username'>Name</label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor='tel'>Phone Number</label>
                <input
                    type='tel'
                    name='tel'
                    id='tel'
                    value={tel}
                    required
                    onChange={(e) => setTel(e.target.value)}
                />
                <label htmlFor='tel'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    minLength={1}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor='Ivinted By'>Ivinted By</label>
                <input
                    disabled
                    type='text'
                    name='ref'
                    id='ref'
                    minLength={1}
                    required
                    
                    placeholder={inviter}
                    onChange={(e) => setRef(e.target.value)}
                />
                <button className='signupBtn'>SIGN UP</button>
                {/* <div className="message">{message ? <p>{message}</p> : 
                <p>
                    Already have an account?{" "}
                    <span className='link' onClick={gotoLoginPage}>
                        Login
                    </span>
                </p> }
                </div> */}
            </form>
            
        </div>
        
    );
};
export default Invitation;