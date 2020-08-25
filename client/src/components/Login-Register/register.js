import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { registerUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        isUser: true,
        isDriver: false,
        errors: {}
    }
    // componentDidMount() {
    //   if (this.props.auth.isAuthenticated) {
    //     this.props.history.push('/dashboard');
    //   }
    // }
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
            password: this.state.password,
            password2: this.state.password2,
            isUser: this.state.isUser,
            isDriver: this.state.isDriver
        }
        
        this.props.dispatch(registerUser(newUser, this.props.history));

    }

    render() {
      const {errors} = this.state; 



        return (
            <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your SaveLife account</p>
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
        )
    }
}


Register.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  errors: state.errors
})

export default connect(mapStateToProps)(withRouter(Register));
