import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import {getCurrentProfile} from "../../actions/profile";

const Dashboard = ({getCurrentProfile, auth, profile: {myProfile, loading}}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [])

    return (
        <section className='container'>
            {loading && myProfile === null ? <i className="fa fa-spinner" aria-hidden="true"/> :
            <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user"/>
                    Welcome {myProfile && myProfile.user.name}
                </p>
            </Fragment>}
        </section>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);