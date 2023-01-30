import logo from './logo.svg';
import './main.css';
import { useState, useEffect } from 'react';

function Bank(){
    const [data, setData] = useState(null);
    const [dline, setDline] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3005/balance')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error))
    }, []);

    useEffect(() => {
        fetch('http://localhost:3005/downline')
            .then(response => response.json())
            .then(dline => setDline(dline))
            .catch(error => console.error(error))
    },

    []);

    return(
        <div className="container">
        <header >
        <img src={logo} alt="logo" />
        {/* <img src='../public/DBank.png' alt="logo" /> */}
        <h1>Balance<br></br>ksh.
        { data !== null ? <span id="value">{data}</span> : <p>loading</p>}
        </h1>
      </header>
      <div className="divider"></div>
      <form action="#">
      <h2>Amount to Withdraw</h2>
      <input id="withdrawal-amount" type="number" name="withdraw"  value=""/>
      <input id="submit-btn" type="submit" value="Submit" />
    </form>

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
                        {dline.forEach(item => (
                            
                                <td>{item}</td>
                           
                        ))}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>


        </div>
    )
}

export default Bank;