import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";

function Navbar({isAuthenticated, loading, logout}) {
    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/posts'>Posts</Link>
            </li>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user'/>{' '}
                    <span className='hide-sm'/>Dashboard</Link>
            </li>
            <li>
                <a onClick={logout} href="#!">
                    <i className='fas fa-sign-out-alt'/>{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to='/profiles'>Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"/> DevConnector</Link>
                </h1>
                {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
            </nav>
        </div>
    );
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
})
export default connect(mapStateToProps, {logout})(Navbar);