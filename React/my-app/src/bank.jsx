// import logo from './logo.svg';
// import './index.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";


function Bank(){

    var acc = useLocation().state.acc;
    
    const [data, setData] = useState(null);
    const [dline, setDline] = useState([]);
    const navigate = useNavigate();


    function handleSignOut(){
        navigate("/");
    }

    const gotoInitationPage = () => navigate(`/invitation?ref=${acc}`);

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify({
            acc: acc,
        }),
    }

    useEffect(() => {
        let url = 'http://localhost:3005/balance';
        fetch(url, options)
            .then(response => {return response.json()})
            .then(data => setData(data))
            .catch(error => console.error(error))
    });

    useEffect(() => {
        let url = 'http://localhost:3005/downline';
        fetch(url,options)
            .then(response => response.json())
            .then(dline => setDline(dline))
            .catch(error => console.error(error))
    },[]
    );

    // useEffect(() => {
    //     fetch('http://localhost:3005/downline')
    //         .then(response => response.json())
    //         .then(dline => {console.log(dline)
    //             setDline(dline)})
    //         .catch(error => console.error(error))
    // },

    // []);
 
    return(
        <div className="container">
        <header >
        {/* <img src={logo} alt="logo" /> */}
        {/* <img src='../public/DBank.png' alt="logo" /> */}
        <h1>Balance<br></br>ksh.
        { data !== null ? <span id="value">{data}</span> : <p>loading</p>}
        </h1>
      </header>
      <div className="divider"></div>
      <div>
      <form action="#">
      <h2>Withdraw</h2>
      <input id="withdrawal-amount" type="number" name="withdraw"  value=" " placeholder='Amount'/>
      <input id="submit-btn" type="submit" value="Submit" />
    </form>
    </div>

    <div>
        <h2>Network</h2>
    </div>

    <div>
            {dline ? (
                <table border= "1">
                    <thead color='white'>
                        <tr>
                            <th>Level1</th>
                            <th>Level2</th>
                            <th>Level3</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {dline.map((item,index) => (
                            
                                <td key={index}>{item}</td>
                           
                        ))}
                        </tr>
                     
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        <br></br>
        <br></br>
        <a href={`https://wa.me/?text=Join me on my network using this link: http://localhost:3000/invitation?inviter=${acc}`}>
  Build you network by inviting your friends
</a>
        <button className='signOutBtn' onClick={handleSignOut}>
                SIGN OUT
            </button>

        </div>
    )
}

export default Bank;

