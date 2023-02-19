import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/register";
import Invitation from "./auth/invitation";
import Bank from "./bank";
import ForgotPassword from "./auth/forgotPassword";
import ResetPassword from "./auth/resetPassword";
// import  UserContextProvider  from "./userContext";

function App() { 
   
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Signup />} />
                <Route path='/invitation' element={<Invitation />} />
                <Route path='/bank' element={<Bank />}></Route>
                <Route path='/forgotPassword' element={<ForgotPassword />} />
                <Route path='/resetPassword' element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    
    );
}

export default App;