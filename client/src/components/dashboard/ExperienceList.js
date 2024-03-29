import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {deleteExperience} from "../../actions/profile";
import Moment from "react-moment";

function ExperienceList({experiences, deleteExperience}) {

    const experienceList = experiences.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -- {
                exp.to === null ? (' Now') :
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
            }
            </td>
            <td>
                <button onClick={() =>deleteExperience(exp._id)} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className='table'>
                <thead>
                <tr>
                    <th> Company</th>
                    <th className='hide-sm'> Title</th>
                    <th className='hide-sm'>Years</th>
                    <th/>
                </tr>
                </thead>
                <tbody>{experienceList}</tbody>
            </table>
        </Fragment>
    );
}


const mapStateToProps = state => ({
    experiences: state.profile.myProfile.experience
})

export default connect(mapStateToProps, {deleteExperience})(ExperienceList);