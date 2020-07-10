import React, {useReducer} from "react";
import axios from "axios" ;
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS} from "../types";

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
    const loadUser = async ()=>{
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get("api/auth");
            dispatch({type:USER_LOADED, payload:res.date})
        } catch (error) {
            console.error(error.message)
            dispatch({type:AUTH_ERROR})
        }
    }

    //Reguster User
    const register= async (formData)=>{
        const config = {
            headers:{"ContentType":"application/json"}
        };

        try {
            const res = await axios.post("/api/users", formData, config);
            dispatch({type:REGISTER_SUCCESS, payload:res.data})
        } catch (error) {
            console.error(error.message)
            dispatch({type:REGISTER_FAIL, payload:error.response.data.msg})
        }

        loadUser();
    }

    //Login
    const login = ()=>{
        
    }

    //Logout
    const logout = ()=>{
        
    }

    //Clear Errors
    const clearErrors = ()=>{
        dispatch({type:CLEAR_ERRORS})
    }

    return(
        <AuthContext.Provider value = {{
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          loading: state.loading,
          user: state.user,
          error: state.error,
          register,
          loadUser,
          login,
          logout,
          clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;