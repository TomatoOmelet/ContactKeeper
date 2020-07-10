import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";

import PrivateRoute from "./components/routing/PrivateRoute"

import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Alerts from "./components/layout/Alerts"

import ContactState from "./context/contact/ContactState"
import AuthState from "./context/auth/AuthState"
import AlertState from "./context/alert/AlertState"

import setAuthToken from "./utils/setAuthToken"

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <ContactState>
    <AuthState>
    <AlertState>
    <BrowserRouter>
      <Fragment>
        <Navbar/>
        <div className="container">
          <Alerts/>
          <Switch>
            <PrivateRoute exact path="/" component = {Home}/>
            <Route exact path="/About" component = {About}/>
            <Route exact path="/Register" component = {Register}/>
            <Route exact path="/Login" component = {Login}/>
          </Switch>
        </div>
      </Fragment>
    </BrowserRouter>
    </AlertState>
    </AuthState>
    </ContactState>
  );
}

export default App;
