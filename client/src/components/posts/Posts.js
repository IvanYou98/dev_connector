import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import {getPosts} from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({post: {posts, loading}, getPosts}) => {
    useEffect(() => {
            getPosts();
        },
        [getPosts]);
    return (
        (loading ? (
            <Fragment>
                <i className="fas fa-spinner"/>
            </Fragment>
        ) : (
            <section className="container">
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                    <i className="fas fa-user"/>
                    Welcome to the community
                </p>
                <PostForm/>
                <div className="posts">
                    {posts.map(post => <PostItem key={post._id} post={post}/>)}
                </div>
            </section>
        )))

        ;
}

const mapStateToProps = state => ({
    post: state.post
})


export default connect(mapStateToProps, {getPosts})(Posts);