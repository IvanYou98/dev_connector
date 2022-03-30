import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import {getCurrentProfile} from "../../actions/profile";
import profile from "../../reducers/profile";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";

const Dashboard = ({getCurrentProfile, auth:{user}, profile: {myProfile, loading}}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [])

    return (
        <section className='container'>
            {loading || user === null ? <i className="fa fa-spinner" aria-hidden="true"/> :
                <Fragment>
                    <h1 className="large text-primary">Dashboard</h1>
                    <p className="lead">
                        <i className="fas fa-user"/>
                        Welcome {user.name}
                    </p>
                    {myProfile !== null ? <Fragment>
                            <DashboardActions/>
                        </Fragment> :
                        <Fragment>
                            <p>You have not yet setup a profile, please add some info </p>
                            <Link to='/create-profile' className='btn btn-primary my-1'>
                                Create Profile
                            </Link>
                        </Fragment>}
                </Fragment>}
        </section>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);