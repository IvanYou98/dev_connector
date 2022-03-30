import {ADD_EDU, ADD_EXP, CLEAR_PROFILE, DEL_EDU, DEL_EXP, GET_PROFILE, PROFILE_ERR} from "../actions/types";

const initialState = {
    myProfile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case ADD_EXP:
        case ADD_EDU:
        case DEL_EXP:
        case DEL_EDU:
        case GET_PROFILE:
            return {
                ...state,
                myProfile: payload,
                loading: false
            }
        case PROFILE_ERR:
            return {
                ...state,
                myProfile: null,
                loading: false,
                error: payload,
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                myProfile: null,
                repos: [],
                loading: false
            }
        default:
            return state
    }
}