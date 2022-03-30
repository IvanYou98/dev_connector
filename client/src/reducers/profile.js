import {GET_PROFILE, PROFILE_ERR} from "../actions/types";

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
        case GET_PROFILE:
            return {
                ...state,
                myProfile: payload,
                loading: false
            }
        case PROFILE_ERR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}