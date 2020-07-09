import React, {useReducer} from "react"
import {v4 as uuid} from "uuid"
import contactContext from "./contactContext"
import contactReducer from "./contactReducer"
import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, FILTER_CONTACTS, CLEAR_FILTER, UPDATE_CONTACT} from "../types"

const ContactState = (props)=>{
    const initialState = {
        contacts:[{
            id:1,
            name:"A Name",
            email:"name@gmail.com",
            phone:"333-333-333",
            type:"personal"
        }],
        current : null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Add Contact
    const addContact=(contact)=>{
        contact.id = uuid();
        dispatch({type:ADD_CONTACT, payload:contact})
    }

    //Delete Contact
    const deleteContact=(id)=>{
        dispatch({type:DELETE_CONTACT, payload:id})
    }

    //Set Current Contact
    const setCurrent=(contact)=>{
        dispatch({type:SET_CURRENT, payload:contact})
    }

    //Clear Current Contact
    const clearCurrent=()=>{
        dispatch({type:CLEAR_CURRENT})
    }

    //Update Contact
    const updateContact=(contact)=>{
        dispatch({type:UPDATE_CONTACT, payload:contact})
    }

    //Filter Contacts

    //Clear Filters

    return(
        <contactContext.Provider value = {{
            contacts : state.contacts,
            current: state.current,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact
        }}>
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;