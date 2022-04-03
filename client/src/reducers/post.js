import React from 'react';
import {
    ADD_COMMENT,
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    REMOVE_COMMENT,
    UPDATE_LIKES
} from "../actions/types";

const initialState = {
    posts: [],
    selectedPost: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload.postId),
                loading: false
            }
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                selectedPost: payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                loading: false,
                posts: [payload, ...state.posts]
            }
        case ADD_COMMENT:
            return {
                ...state,
                loading: false,
                selectedPost:
                    {
                        ...state.selectedPost,
                        comments: payload.comments
                    }
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                loading: false,
                selectedPost: {
                    ...state.selectedPost,
                    comments: state.selectedPost.comments.filter(comment => comment._id !== payload.commentId)
                }

            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ?
                    {...post, likes: payload.likes} : post),
                loading: false
            }
        default:
            return state
    }
}
