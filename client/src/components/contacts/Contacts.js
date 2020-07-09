import React, {Fragment, useContext} from 'react'
import {CSSTransition, TransitionGroup} from "react-transition-group"
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
            <TransitionGroup>
            {contactsToShow.map((contact)=> (
                <CSSTransition key = {contact.id} timeout={500} classNames="item">
                    <ContactItem contact = {contact}/>
                </CSSTransition>
            ))}
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts
