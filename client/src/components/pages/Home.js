import React, {useContext, useEffect} from 'react'
import Contacts from "../contacts/Contacts"
import ContactForm from "../contacts/ContactForm"
import ContactFilter from "../contacts/ContactFilter"
import AuthContext from "../../context/auth/authContext"

const Home = () => {
    useEffect(()=>{
        authContext.loadUser();
        //eslint-disable-next-line
    }, [])

    const authContext = useContext(AuthContext);
    return (
        <div className="grid-2">
            {/*Form*/}
            <div>
                <ContactForm/>
            </div>

            <div>
                <ContactFilter/>
                <Contacts/>
            </div>
        </div>
    )
}

export default Home
