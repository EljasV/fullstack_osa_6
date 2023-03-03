import {createSlice} from "@reduxjs/toolkit";

const initialState = ""

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        displayMessage(state, action) {
            console.log(action)
            return action.payload
        },
        reset(state, action) {
            return ""
        }
    }
})

export const {displayMessage, reset} = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(displayMessage(content))
        setTimeout(() => {
            dispatch(reset())
        }, time * 1000)
    }
}
export default notificationSlice.reducer