import React, { Component } from 'react';
import "./nothing.css"
const Loading = () => {
    return ( 
        <div>
            <img className="loading" src={require("./nothing.png")} alt=""/>
        </div>
     );
}
 
export default Loading;