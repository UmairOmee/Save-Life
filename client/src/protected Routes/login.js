import React, { Component } from 'react';
import {Route,Redirect} from "react-router-dom";
import auth from "../authentication User/auth"
const ProtectedRoute = ({component:Component,...rest}) => {
    return (  
        <Route {...rest} render={(props)=>{
            if(auth.isAuthenticated()){
                return <Redirect to={{pathname:"/"}}/>
            }else{
                return <Component {...props}/>
            }
        }}/>
    );
}
 
export default ProtectedRoute;