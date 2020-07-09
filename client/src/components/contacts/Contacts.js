import React, {Fragment, useContext} from 'react'
import ContactContext from "../../context/contact/contactContext"
import ContactItem from "./ContactItem"


const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts, filtered} = contactContext;

    if(contacts.length <= 0){
        return <h4>You do not have any contacts.</h4>
    }


    let contactsToShow = filtered===null?contacts:filtered;
    return (
        <Fragment>
            {contactsToShow.map((contact)=> (
                <ContactItem key = {contact.id} contact = {contact}/>
            ))}
        </Fragment>
    )
}

export default Contacts
