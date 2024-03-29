import React from 'react';
import Moment from "react-moment";

const ProfileEducation = ({edu: {
    school,
    from,
    to,
    degree,
    fieldOfStudy,
    description
}}) => {
    return (
        <div>
            <h3>{school}</h3>
            <p><Moment format='YYYY/MM/DD'>{from}</Moment> -
                {to ? <Moment format='YYYY/MM/DD'>{to}</Moment> : 'Now'}
            </p>
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>Field Of Study: </strong>{fieldOfStudy}</p>
            <p>
                <strong>Description: </strong>
                {description}
            </p>
        </div>
    );
};

export default ProfileEducation;