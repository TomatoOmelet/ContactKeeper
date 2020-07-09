import React, {useReducer} from "react"
import AuthContext from "./authContext"
import AuthReducer from "./authReducer"
import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, FILTER_CONTACTS, CLEAR_FILTER, UPDATE_CONTACT} from "../types"

const AuthState = (props)=>{
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load User

    //Reguster User

    //Login

    //Logout

    //Clear State

    return(
        <AuthContext.Provider value = {{
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          loading: state.loading,
          user: state.user,
          error: state.error
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;