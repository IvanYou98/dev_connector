import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import {getProfileById} from "../../actions/profile";
import {Link, useParams} from "react-router-dom";


const Profile = ({profile: {myProfile, loading}, auth, getProfileById}) => {
    const {id} = useParams();
    useEffect(() => {
        getProfileById(id);
    }, [getProfileById])
    return (
        <section className="container">
            {myProfile === null || loading ? <i className="fa fa-spinner" aria-hidden="true"/>:
                <Fragment>
                    <Link to="/profiles" className='btn btn-light'>
                        Back to Profiles
                    </Link>
                    {auth.isAuthenticated && auth.loading === false &&
                    auth.user._id === myProfile.user._id &&
                        (<Link to='/edit-profile' className="btn btn-dark">
                            Edit Profile
                        </Link>)}
                </Fragment>
            }
        </section>
    );
};

const mapStateToProps = state => (
    {
        profile: state.profile,
        auth: state.auth
    }
)
export default connect(mapStateToProps, {getProfileById})(Profile);