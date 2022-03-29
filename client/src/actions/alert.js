import {SET_ALERT, REMOVE_ALERT} from "./types"
import {v4} from 'uuid'
import {type} from "@testing-library/user-event/dist/type";

export const setAlert = (msg, alertType) => dispatch => {
    const id = v4();
    dispatch({
        type: SET_ALERT,
        payload: {
            msg, alertType, id
        }
    });

    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), 5000);

}