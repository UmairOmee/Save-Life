import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import DashboardSidebar from '../My Account/dashboardSidebar'
import TextFieldGroup from '../common/TextFieldGroup';
// import {GET_ERRORS} from '../../actions/types'

class AddDriver extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        isDriver: true,
        isUser: false,
        errors: {}
    }

    // Register User
    registerUser =  (userData) => dispatch => {
    axios
    .post('/api/users/register', userData)
    .then(res => this.props.history.push('/myaccount'))
    .catch(err => 
        dispatch({
            type: "GET_ERRORS",
            payload: err.response.data
        })
        );
}


    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    } 
    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            isDriver: this.state.isDriver,
            isUser: this.state.isUser,
            password: this.state.password,
            password2: this.state.password2
        }
        
        this.props.dispatch(this.registerUser(newUser));

    }

    render() {
      const {errors} = this.state; 



        return (
            <DashboardSidebar>
                <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create Driver's SaveLife account</p>
                  <form noValidate onSubmit={this.onSubmit}>
                    <TextFieldGroup 
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                    />
                    <TextFieldGroup 
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    info="Your email must be unique that is not used before on this site"
                    error={errors.email}
                    />
                    <TextFieldGroup 
                     placeholder='Password'
                     type="password"
                     name="password"
                     value={this.state.password}
                     onChange={this.onChange}
                     error={errors.password}
                    />
                    <TextFieldGroup 
                     placeholder='ConfirmPassword'
                     type="password"
                     name="password2"
                     value={this.state.password2}
                     onChange={this.onChange}
                     error={errors.password2}
                    />
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
            </DashboardSidebar>
        )
    }
}


AddDriver.propTypes = {
//   registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  errors: state.errors
})

export default connect(mapStateToProps)(withRouter(AddDriver));