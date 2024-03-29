import React, {Fragment, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getGithubRepos} from "../../actions/profile";

const ProfileGithub = ({repos, username, getGithubRepos}) => {
    useEffect(
        () => {
            // console.log('Fetching repos of', username);
            getGithubRepos(username);
        }, [getGithubRepos, username]
    )
    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">
                <i className="fab fa-github"/> Github Repos
            </h2>
            {repos === null ? <i className="fa fa-spinner"/> :
                <Fragment>
                    {repos.map((repo,idx) => (
                        <div key={idx} className="repo bg-white p-1 my-1">
                            <div>
                                <h4><a href={repo.html_url} target="_blank"
                                       rel="noopener noreferrer">{repo.name}</a></h4>
                                <p>
                                    {repo.description}
                                </p>
                            </div>
                            <div>
                                <ul>
                                    <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                                    <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                                    <li className="badge badge-light">Forks: {repo.forks_count}</li>
                                </ul>
                            </div>
                        </div>
                    ))}

                </Fragment>
            }


        </div>
    );
};

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub);