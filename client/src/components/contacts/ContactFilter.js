import React, {useContext, useRef, useEffect} from 'react';
import ContactContext from "../../context/contact/contactContext"

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef("");

    const onChange = (e)=>{
        if(text.current.value.length > 0){
            contactContext.filterContacts(e.target.value);
        }else{
            contactContext.clearFilter();
        }
    }

    useEffect(()=>{
        if(contactContext.filtered === null)
        {
            text.current.value = ""
        }
    }, [])

    return (
        <form>
           <input ref={text} type = "text" placeholder="Filter Contacts..." onChange={onChange}/> 
        </form>
    )
}

export default ContactFilter
