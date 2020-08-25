import React from 'react';
import Title from './Title/Title';
// import Roll from 'react-reveal/Roll';

// for services
export const services=[
    {
        id:1,
        icon:"fas fa-ambulance",
        column:'Column 1',
        text:"Ambulance Service for emergency purpose charges you extra cost but if you book ambulance as relgular booking then 40% OFF"
    },
    {   
        id:2,
        icon:"fas fa-hospital-user",
        column:'Column 2',
        text:"Patient can book ambulance for checkup according time and date. SaveLife Abulance Reach your door step before your given time"
    },
    {
        id:3,
        icon:"fas fa-procedures",
        column:'Column 3',
        text:"First Ambulance that have all facilities required for patient recovery from disease"
    },
    {
        id:4,
        icon:"fas fa-briefcase-medical",
        column:'Column 4',
        text:"Save Life Ambulance Service that not only take patient to hospital but also provides first aid facility that was very important in any case."
    }
]

function Services(props) {
    return (
                    <section className="services">
                        <div className="inside-container">
                            <Title title="Services" color="#fff"/>
                            <div className="services-center">
                                {services.map(service => {
                                    return(
                                        <div className="single-service" key={service.id}>
                                            <i className={service.icon}></i>
                                            <div className="texts">
                                                <h2>{service.column}</h2>
                                                <p>{service.text}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                )
            }

export default Services;