import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import {Fragment, useEffect} from "react";
import Alert from "./components/auth/Alert";
// Redux
import {Provider} from "react-redux";
import store from "./store";
import {loadUser} from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";


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
                        <Route element={<PrivateRoute/>}>
                            <Route exact path='/dashboard' element={<Dashboard/>}/>
                            <Route exact path='/create-profile' element={<CreateProfile/>}/>
                            <Route exact path='/edit-profile' element={<EditProfile/>}/>
                        </Route>
                    </Routes>
                </Fragment>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
