import React from 'react';

const ProfileTop = ({
                        profile: {
                            status,
                            company,
                            location,
                            website,
                            social,
                            user: {name, avatar}
                        }
                    }) => {
    return (
        <div className="profile-top bg-primary p-2">
            <img
                className="round-img my-1"
                src={avatar}
                alt=""
            />
            <h1 className="large">{name}</h1>
            <p className="lead">
                {status} {company && <span> at {company}</span>}
            </p>
            <p>{location}</p>
            <div className="icons my-1">
                {website &&
                    (<a href={website} target="_blank" rel="noreferrer">
                        <i className="fas fa-globe fa-2x"/>
                    </a>)}
                {social && social.twitter
                (<a href={social.twitter} target="_blank" rel="noreferrer">
                    <i className="fas fa-globe fa-2x"/>
                </a>)}
                {social && social.facebook
                (<a href={social.facebook} target="_blank" rel="noreferrer">
                    <i className="fas fa-globe fa-2x"/>
                </a>)}
                {social && social.linkedin &&
                    (<a href={social.linkedin} target="_blank" rel="noreferrer">
                        <i className="fas fa-globe fa-2x"/>
                    </a>)}
                {social && social.youtube
                (<a href={social.youtube} target="_blank" rel="noreferrer">
                    <i className="fas fa-globe fa-2x"/>
                </a>)}
                {social && social.instagram
                (<a href={social.instagram} target="_blank" rel="noreferrer">
                    <i className="fas fa-globe fa-2x"/>
                </a>)}
            </div>
        </div>
    )
        ;
};

export default ProfileTop;