import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import {getPost} from "../../actions/post";
import {Link, useParams} from "react-router-dom";

const Post = ({post: {selectedPost, loading}, getPost}) => {
    const {postId} = useParams();

    useEffect(() => {
        getPost(postId);
    }, [getPost, postId])

    console.log(selectedPost);


    return (<section className="container">
            {loading ? <i className="fas fa-spinner"/> :
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


        // <section className="container">
        //     <Link to='/posts' className="btn">Back To Posts</Link>
        //     <div className="post bg-white p-1 my-1">
        //         <div>
        //             <Link to={`/profile/${user}`}>
        //                 <img
        //                     className="round-img"
        //                     src={avatar}
        //                     alt=""
        //                 />
        //                 <h4>{name}</h4>
        //             </Link>
        //         </div>
        //         <div>
        //             <p className="my-1">
        //                 {text}
        //             </p>
        //         </div>
        //     </div>
        //
        //     <div className="post-form">
        //         <div className="bg-primary p">
        //             <h3>Leave A Comment</h3>
        //         </div>
        //         <form className="form my-1">
        //   <textarea
        //       name="text"
        //       cols="30"
        //       rows="5"
        //       placeholder="Comment on this post"
        //       required
        //   />
        //             <input type="submit" className="btn btn-dark my-1" value="Submit"/>
        //         </form>
        //     </div>
        //
        //     <div className="comments">
        //         <div className="post bg-white p-1 my-1">
        //             <div>
        //                 <Link to="">
        //                     <img
        //                         className="round-img"
        //                         src={avatar}
        //                         alt=""
        //                     />
        //                     <h4>{name}</h4>
        //                 </Link>
        //             </div>
        //             <div>
        //                 <p className="my-1">
        //                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
        //                     possimus corporis sunt necessitatibus! Minus nesciunt soluta
        //                     suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
        //                     dolor? Illo perferendis eveniet cum cupiditate aliquam?
        //                 </p>
        //                 <p className="post-date">
        //                     Posted on 04/16/2019
        //                 </p>
        //             </div>
        //         </div>
        //
        //         <div className="post bg-white p-1 my-1">
        //             <div>
        //                 <a href="profile.html">
        //                     <img
        //                         className="round-img"
        //                         src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
        //                         alt=""
        //                     />
        //                     <h4>John Doe</h4>
        //                 </a>
        //             </div>
        //             <div>
        //                 <p className="my-1">
        //                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
        //                     possimus corporis sunt necessitatibus! Minus nesciunt soluta
        //                     suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
        //                     dolor? Illo perferendis eveniet cum cupiditate aliquam?
        //                 </p>
        //                 <p className="post-date">
        //                     Posted on 04/16/2019
        //                 </p>
        //                 <button
        //                     type="button"
        //                     className="btn btn-danger"
        //                 >
        //                     <i className="fas fa-times"></i>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
};


const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, {getPost})(Post);