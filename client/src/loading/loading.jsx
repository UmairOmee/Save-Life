import React, { Component } from 'react';
import "./loading.css"
const Loading = () => {
    return ( 
        <div>
            <img className="loading" src={require("./tenor.gif")} alt=""/>
        </div>
     );
}
 
export default Loading;