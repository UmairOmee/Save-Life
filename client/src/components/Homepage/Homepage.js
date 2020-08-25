import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import './Homepage.css';
// import { Link } from 'react-router-dom'
import Header from './PageHeader';
import Services from './Services'
// import Portfolio from './Portfolio';
import Whois from './Whois'
import ContactForm from './ContactForm'
// import Auth from '../auth/autht'



class Landing extends Component {
//   componentDidMount() {
//     if (this.props.auth.isAuthenticated) {
//       this.props.history.push('/dashboard');
//     }
//   }

    render() {
    return ( 
        <div>
            <Header/>
            <Services/>
            <Whois/>
            <ContactForm/>
        </div>
            
        )
    }
}

// Landing.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default connect()(Landing);
