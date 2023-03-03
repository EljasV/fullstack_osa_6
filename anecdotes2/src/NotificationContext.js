import {createContext, useContext, useReducer} from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET": {
            return action.payload
        }
        case "RESET": {
            return ""
        }
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notificationMessage, notificationDispatch] = useReducer(notificationReducer, "")
    return (<NotificationContext.Provider value={[notificationMessage, notificationDispatch]}>
        {props.children}
    </NotificationContext.Provider>)

}

export const useNotificationMessage = () => {
    return useContext(NotificationContext)[0]
}
export const useNotificationDispatch = () => {
    return useContext(NotificationContext)[1]
}

export default NotificationContext