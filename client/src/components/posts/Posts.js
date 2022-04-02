import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getPosts} from "../../actions/post";

const Posts = ({post, getPosts}) => {
    useEffect(() => {
            getPosts();
        },
        [getPosts]);
    return (
        <section className="container">
            Posts
        </section>
    );
}

const mapStateToProps = state => ({
    post: state.post
})


export default connect(mapStateToProps, {getPosts})(Posts);