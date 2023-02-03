import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/register";
import Verify from "./auth/verify";
import Bank from "./bank";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Signup />} />
                <Route path='/verify' element={<Verify />} />
                <Route path='/bank' element={<Bank />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;