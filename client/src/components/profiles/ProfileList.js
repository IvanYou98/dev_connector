import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import {getAllProfiles} from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const ProfileList = ({getAllProfiles, profile: {profiles, loading}}) => {
    useEffect(() => getAllProfiles(), [getAllProfiles]);

    return (
        <section className="container">
            {loading ? <i className="fa fa-spinner" aria-hidden="true"/> :
                <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"/> Browse and connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.map(profile => (<ProfileItem key={profile._id} profile={profile}/>))
                        ) : <h4>No profiles found...</h4>}
                    </div>
                </Fragment>
            }
        </section>
    );
};


const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getAllProfiles})(ProfileList);
