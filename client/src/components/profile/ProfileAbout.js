import React from 'react';

const ProfileAbout = ({
                          profile: {
                              bio,
                              skills,
                              user: {name}
                          }
                      }) => {
    return (
        <div className="profile-about bg-light p-2">
            <h2 className="text-primary">{name}'s Bio</h2>
            <p>
                {bio}
            </p>
            <div className="line"/>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {skills.map((skill,idx) => (<div className="p-1" key={idx}><i className="fa fa-check"/> {skill}</div>))}
            </div>
        </div>
    );
};

export default ProfileAbout;