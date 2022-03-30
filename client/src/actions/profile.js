import axios from "axios";
import {setAlert} from "./alert";

import {
    ADD_EDU,
    ADD_EXP, DEL_EDU, DEL_EXP,
    GET_PROFILE,
    PROFILE_ERR,
    SAVE_PROFILE,

} from "./types";

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

// Create or update a profile
export const saveProfile = (formData, navigate, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: SAVE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', "success"));
        if (!edit) {
            navigate('/dashboard', {replace: true})
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const addExperience = (formData, navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: ADD_EXP,
            payload: res.data
        })
        dispatch(setAlert('Experience Added', "success"));
        navigate('/dashboard', {replace: true});
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const addEducation = (formData, navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: ADD_EDU,
            payload: res.data
        })
        dispatch(setAlert('Education Added', "success"));
        navigate('/dashboard', {replace: true});
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const deleteExperience = (experience_id) => async dispatch => {
    try {
        const res = await axios.delete(`api/profile/experience/${experience_id}`);
        dispatch({
            type: DEL_EXP,
            payload: res.data
        });
        dispatch(setAlert('Experience Deleted', "success"));
    } catch (err) {
        dispatch({
            type: PROFILE_ERR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const deleteEducation = (education_id) => async dispatch => {
    try {
        const res = await axios.delete(`api/profile/education/${education_id}`);
        dispatch({
            type: DEL_EDU,
            payload: res.data
        });
        dispatch(setAlert('Education Deleted', "success"));
    } catch (err) {
        dispatch({
            type: PROFILE_ERR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
