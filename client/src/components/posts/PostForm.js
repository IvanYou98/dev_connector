import React, {useState} from 'react';
import {connect} from "react-redux";
import {addPost} from "../../actions/post";

const PostForm = ({addPost}) => {
    const [text, setText] = useState('')


    const onSubmit = e => {
        e.preventDefault();
        addPost({text});
        console.log('submitted!')
        setText('');
    }


    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={e => onSubmit(e)}>
          <textarea
              name="text"
              value={text}
              cols="30"
              rows="5"
              placeholder="Create a post"
              onChange={e => setText(e.target.value)}
              required
          />
                <input type="submit" className="btn btn-dark my-1" value="Submit"/>
            </form>
        </div>
    );
};


export default connect(null, {addPost})(PostForm);