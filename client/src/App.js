import './App.css';
import {Fragment} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

const App = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route exact path='/' element={<Landing/>}/>
                </Routes>
            </BrowserRouter>
        </Fragment>

    );
}

export default App;
