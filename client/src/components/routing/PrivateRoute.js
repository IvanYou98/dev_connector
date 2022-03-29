import React from 'react';
import {Outlet} from "react-router-dom";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";


function PrivateRoute({auth}) {
    return auth.isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);