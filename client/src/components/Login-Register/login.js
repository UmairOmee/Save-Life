import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import UserAuth from '../../authentication User/auth'
import AdminAuth from '../../authentication Admin/auth';
import DriverAuth from '../../authentication Driver/auth'

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: ""
    }
    // componentDidMount() {
    //   if (this.props.auth.isAuthenticated) {
    //     this.props.history.push('/dashboard');
    //   }
    // }
    // componentWillReceiveProps(nextProps) {
    //   if(nextProps.auth.isAuthenticated) {
    //     this.props.history.push('/dashboard');
    //   }
    //   console.log(nextProps);

    //   if(nextProps.errors) {
    //     this.setState({ errors: nextProps.errors })
    //   }
    // }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    } 
    onSubmit = (e) => {
      e.preventDefault();
      // const newUser = {
      //     username: this.state.email,
      //     password: this.state.password
      // }

      fetch("/api/users/login", {
              
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password
        })
      }).then((res)=>res.json()).then((mesage)=>{
          console.log(mesage)
          if(mesage.user){
          this.props.dispatch(addUser(mesage.user));
          console.log(mesage.user.isAdmin);
          if(mesage.user.isAdmin&&mesage.user.isDriver){
              AdminAuth.login();
              DriverAuth.login();
                  UserAuth.login()
                 this.props.history.push("/myaccount")               
              console.log(AdminAuth.isAuthenticated());
            }else if(mesage.user.isDriver){
                DriverAuth.login();                 
                    UserAuth.login()
                   this.props.history.push("/myaccount")                
            }else{
                        UserAuth.login()
                        this.props.history.push("/myaccount")
                        console.log(UserAuth.isAuthenticated());
          }}

    }).catch((err)=> {
      this.setState({
        errors: "Your email or password is incorrect"
      })
    })
  }
    render() {
      const { errors } = this.state;
      console.log(errors)
        return (
            <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your SaveLife account</p>
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup 
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors}
                    />
          
                    <TextFieldGroup 
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors}
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

// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

export default connect()(Login);
// export default Login;
