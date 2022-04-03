import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import {getPost} from "../../actions/post";
import {Link, useParams} from "react-router-dom";

const Post = ({post: {selectedPost, loading}, getPost}) => {
    const {postId} = useParams();

    useEffect(() => {
        getPost(postId);
        console.log('After getting post')
    }, [])


    return(<section className="container">
            {loading || selectedPost === null ? <i className="fas fa-spinner"/> :
                <Fragment>
                    <Link to='/posts' className="btn">Back To Posts</Link>
                    <div className="post bg-white p-1 my-1">
                                 <div>
                                     <Link to={`/profile/${selectedPost.user}`}>
                                         <img
                                             className="round-img"
                                             src={selectedPost.avatar}
                                             alt=""
                                         />
                                         <h4>{selectedPost.name}</h4>
                                     </Link>
                                 </div>
                        <div>
                            <p className="my-1">
                                {selectedPost.text}
                            </p>
                        </div>
                    </div>
                </Fragment>
            }
        </section>
    );
};


const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, {getPost})(Post);