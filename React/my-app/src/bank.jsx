// import logo from './logo.svg';
// import './index.css';
import { useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
// import userContext  from "./userContext";


function Bank(){

    const acc = useLocation().state.acc;
    const phoneNumber = useLocation().state.phoneNumber;
    console.log(useLocation());
    // const {acc} = useContext(userContext);
    
    const [data, setData] = useState(null);
    const [dline, setDline] = useState([]);
    const [amount, setAmount] = useState(0);
    const [messageMpesa, setMessageMpesa] = useState("");


    const navigate = useNavigate();


    function handleSignOut(){
        navigate("/");
    }

    function transact(e){
        e.preventDefault();
        console.log("in transact");
        let url = 'http://localhost:3008/checkout';
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify({
                acc: acc,
                amount: amount,
                type: "debit",
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.ResultCode === 0){
                setAmount(0);
                setMessageMpesa("Complete the request by responding to the prompt on your phone");
                
            }else{
                setMessageMpesa("Transaction failed to push to mpesa. Please try again later");
                console.log(data);
            }
        })
        .catch(error => console.error(error))
    }

    // const gotoInitationPage = () => navigate(`/invitation?ref=${acc}`);

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
      {/* <h2>Withdraw</h2> */}
      <input id="withdrawal-amount" type="number" name="withdraw"  value=" " placeholder='Amount'/>
      {/* <input id="submit-btn" type="submit" value="Submit" /> */}
      <button>Cash Out</button>
    </form>
    </div>
    <div className="transact">
    <form onSubmit={transact}>
        <label htmlFor="airtime">Airtime</label>
        <input id="airtime" type="number" name="amount"  value={amount} onChange = {(e) => setAmount(e.target.value)} placeholder='Amount'/>
        {/* displays message after transaction is pushed to mpesa */}
        <div className="message">{messageMpesa ? 
                <p style={{color:"red"}}>{messageMpesa} {" "} </p>: null}
            </div>
        <button>Buy</button>
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

