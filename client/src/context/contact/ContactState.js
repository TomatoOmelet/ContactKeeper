import React, {useReducer} from "react"
import uuid from "uuid"
import contactContext from "./contactContext"
import contactReducer from "./contactReducer"
import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, FILTER_CONTACTS, CLEAR_FILTER} from "../types"

const ContactState = (props)=>{
    const initialState = {
        contacts:[{
            id:1,
            name:"A Name",
            email:"name@gmail.com",
            phone:"333-333-333",
            type:"personal"
        }]
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Add Contact

    //Delete Contact

    //Set Current Contact

    //Clear Current Contact

    //Update Contact

    //Filter Contacts

    //Clear Filters

    return(
        <contactContext.Provider value = {{
            contacts : state.contacts
        }}>
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;