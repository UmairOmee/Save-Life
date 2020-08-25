import React from 'react';
import Title from './Title/Title'
import { Link } from 'react-router-dom'

function Whois(props) {
    return (
        <div className="whoIs">
           <div className="inside-container">
              <Title title="About SaveLife Ambulance Service" color="#e8f4dc" /> 

              <div className="whoIs-center">
                  <div className="texts">
                      <p>All users can you this ambulance for emergency and checkup purposes That facilitate you all services.</p>
                 </div>
                 <div className="text-icons">
                     <p>All users can contust us on these following social links available.</p>
                     <div className="media-icons">
                         <Link to="#"><i className="fab fa-twitter"></i></Link>
                         <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                         <Link to="#"><i className="fab fa-google-plus-g"></i></Link>
                         <Link to="#"><i className="fab fa-youtube"></i></Link>
                         <Link to="#"><i className="fab fa-linkedin-in"></i></Link>
                         <Link to="#"><i className="fab fa-pinterest-p"></i></Link>
                     </div>
                 </div>
             </div> 
            </div> 
        </div>
    );
}

export default Whois;