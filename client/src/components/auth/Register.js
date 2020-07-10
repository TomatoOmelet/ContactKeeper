import React, {useState, useContext, useEffect} from 'react';
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
    const [user, setUser] = useState({name:"", email:"", password:"", password2:""});
    const {name, email, password, password2} = user;

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const {setAlert} = alertContext;
    const {register, error, clearErrors, isAuthenticated} = authContext;

    useEffect(()=>{
        if(isAuthenticated)
        {
            setAlert("Please log out before register a new account.","danger")
        }
        //eslint-disable-next-line
    }, [])

    useEffect(()=>{
        if(isAuthenticated)
        {
            props.history.push("/");
        }
         
        if(error !== null && typeof (error) === 'string' && error.length > 0)
        {
            setAlert(error, "danger");
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const onChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(name.length <= 0){
            setAlert("Name cannot be empty", "danger");
        }
        else if(email.length <= 0){
            setAlert("Email cannot be empty", "danger");
        }
        else if(password.length <= 0){
            setAlert("Password cannot be empty", "danger");
        }
        else if(password !== password2){
            setAlert("Passwords do not match", "danger");
        }else{
            register({name, email, password});
        }

    }

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Register</span></h1>
        
            <form onSubmit = {onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required minLength="6"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6"></input>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Register
