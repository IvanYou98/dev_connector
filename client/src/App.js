import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {Fragment, useEffect} from "react";
import Alert from "./components/auth/Alert";

// Redux
import {Provider} from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";


const App = () => {
    useEffect(() => {
        store.dispatch(loadUser())
    }, [])
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <Navbar/>
                    <Alert/>
                    <Routes>
                        <Route exact path='/' element={<Landing/>}/>
                        <Route exact path='/login' element={<Login/>}/>
                        <Route exact path='/register' element={<Register/>}/>
                    </Routes>
                </Fragment>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
