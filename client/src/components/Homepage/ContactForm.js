import React from 'react';
import Title from './Title/Title'

function ContactForm(props) {
    return (
        <section className="contact-form">
          <div className="inside-container">
              <Title title="contact" color="#e8f4dc" />
              <div className="contact-form-center">
            <form >
                <div className="form-inputs-texts">
                  <div className="inputs">
                      <p><label htmlFor="name">FULLNAME</label></p>
                      <input type="text" className="name" name="" id=""/>
                      
                      <p><label htmlFor="email">EMAIL</label></p>
                      <input type="email" className="email" name="" id=""/>
                </div> 

                <div className="form-texts">
                    <p>All users for more details can visit our official website.</p>
                    <p>SaveLife Abulance Service</p>
                    <p>+00 123 street#5,New York,USA</p>
                    <p>(000) 000-0000</p>
                </div> 

                </div>
                <div className="form-area">
                    <p><label htmlFor="message">MESSAGE</label></p>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <button type="button" className="btnForm">MESSAGE</button>
            </form>
              </div>
          </div>
      </section>
    );
}

export default ContactForm;