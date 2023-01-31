import './styles.css'
import react from 'react';

export default function AppForm() {

  let time = new Date().toLocaleTimeString();
  const[timeNow,setTime] = react.useState(time);
  function getTime(){
    setTime(time);
  }
//   setInterval(getTime,10000);


  const[headingText, setHeadingText] = react.useState("Hello");
  const[mouseOn, setMouse] = react.useState(false);
  
//   function handleSubmit(){
//   setHeadingText("Submitted");
//   }

  function handleMouseIn(){
   
    setMouse(true);
  }

  function handleMouseOut(){
    setMouse(false);
  }

  const [name, setName] = react.useState("");
  const [email, setEmail] = react.useState("");
  const [password, setPassword] = react.useState("");
  const [ref, setRef] = react.useState("");
  const [message, setMessage] = react.useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch('http://localhost:3005/register', {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
            ref: ref,
        })
      });
      let resJson = await res.json();
      console.log(resJson.status);
      if (res.status === 200) {
        setName("");
        setEmail("");
        setPassword("");
        setRef("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div id='main'>
    <div>
      <div>
        <h1>{timeNow}</h1>
      </div>
      React ⚛️ + Vite ⚡ + Replit 🌀
      <div className="container">
        <h1>{headingText}</h1>
        <form method='post' onSubmit={handleSubmit}>
            <input name='f_name' type="text" placeholder="What's your first name?"
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <input name='email' type="text" placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input name='password' type="password" placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input name='refer' type="text" placeholder="Refered by?" 
                value={ref}
                onChange={(e) => setRef(e.target.value)}
            />
            <button type='submit' style = {{backgroundColor: mouseOn ? "black" : "white"}}
          onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}
          >Submit</button>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
    </div>
    </div>
  )
}
