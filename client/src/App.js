import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {Fragment} from "react";

const App = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Navbar/>
                <Routes>
                    <Route exact path='/' element={<Landing/>}/>
                    <Route exact path='/login' element={<Login/>}/>
                    <Route exact path='/register' element={<Register/>}/>
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default App;
