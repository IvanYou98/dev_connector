import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import {getProfileById} from "../../actions/profile";
import {Link, useParams} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import profile from "../../reducers/profile";
import ProfileEducation from "./ProfileEducation";


const Profile = ({profile: {myProfile, loading}, auth, getProfileById}) => {
    const {id} = useParams();
    useEffect(() => {
        getProfileById(id);
    }, [getProfileById, id])
    return (
        <section className="container">
            {myProfile === null || loading ? <i className="fa fa-spinner" aria-hidden="true"/> :
                <Fragment>
                    <Link to="/profiles" className='btn btn-light'>
                        Back to Profiles
                    </Link>
                    {auth.isAuthenticated && auth.loading === false &&
                        auth.user._id === myProfile.user._id &&
                        (<Link to='/edit-profile' className="btn btn-dark">
                            Edit Profile
                        </Link>)}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={myProfile}/>
                        <ProfileAbout profile={myProfile}/>
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {myProfile.experience.length > 0 ? (myProfile.experience.map(exp => (
                                    <Fragment key = {exp._id}>
                                        <ProfileExperience experience={exp}/>
                                    </Fragment>
                                ))
                            ) : (<h4>No experience credentials</h4>)}

                        </div>

                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {myProfile.education.length > 0 ? (myProfile.education.map(edu => (
                                <Fragment key = {edu._id}>
                                    <ProfileEducation edu={edu} />
                                </Fragment>
                                ))
                                ) : (<h4>No education credentials</h4>)}
                        </div>
                    </div>
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