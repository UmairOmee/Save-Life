import React from 'react';
import logo from './Logo/logo.png';
import styled from 'styled-components';
// import BackImage from '../../src/images/home.jpg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context/context'
// import { logoutUser } from '../actions/authActions';
// import { clearCurrentProfile } from '../actions/profileActions'
import UserAuth from '../../authentication User/auth'
import AdminAuth from '../../authentication Admin/auth'
import DriverAuth from '../../authentication Driver/auth'
import {addUser} from '../../actions/authActions'
import Map from '../My Account/Map';

class Navbar extends React.Component{
    state = {
        sidebarOpen:false,
        closeLinks:false,
        headerShow:false,
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
      }

    //   open navbar method
    handleSidebar = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        })
    }

    // close links when pushing sidebar
    handleClose = () => {
        this.setState({
            sidebarOpen: false
        })
    }

    logouthandler=()=>{
        fetch("/api/users/logout", {method: 'GET'}).then((res) => res.json()).then((message) => {
            console.log("logout",message.user)
            if (message.success) {
              if(AdminAuth.isAuthenticated()){
                  AdminAuth.logout();
                  UserAuth.logout();
                  DriverAuth.logout();
                  this.props.dispatch(addUser(message.user))
                  
                }else if(DriverAuth.isAuthenticated()) {
                  DriverAuth.logout();
                  UserAuth.logout()
                this.props.dispatch(addUser(message.user))
              }else {
                  UserAuth.logout()
                this.props.dispatch(addUser(message.user))
              }
            }
        }).catch((err) => console.log('msg',err));
    
    }

    // renderLinks = () => {
    //     if(this.props.auth.isAuthenticated && this.props.auth.user.isAdmin){
    //         return (
    //             <ul className="links" onClick={this.handleClose}>
    //                                 <li><Link to="/">Home</Link></li>
    //                                 <li><Link to="/dashboard">Dashboard</Link></li>
    //                                 <li className="nav-item">
    //                                     <Link
    //                                         to=""
    //                                         onClick={this.onLogoutClick.bind(this)}
    //                                         className="nav-link"
    //                                     >
    //                                     Logout
    //                                     </Link>
    //                                     </li>
    //             </ul>
    //         );
    //     } else if(this.props.auth.isAuthenticated){
    //         return(
    //             <ul className="links" onClick={this.handleClose}>
    //                                 <li><Link to="/">Home</Link></li>
    //                                 <li><Link to="/dashboard">Dashboard</Link></li>
    //                                 <li className="nav-item">
    //                                     <Link
    //                                         to=""
    //                                         onClick={this.onLogoutClick.bind(this)}
    //                                         className="nav-link"
    //                                     >
    //                                     Logout
    //                                     </Link>
    //                                     </li>
    //             </ul>
    //         )
    //     }
        
    //     else {
    //         return (<ul className="links" onClick={this.handleClose}>
    //                             <li><Link to="/">Home</Link></li>
    //                             <li><Link to="/login">Signin</Link></li>
    //                             <li><Link to="/signup">Signup</Link></li>
                                
    //                         </ul>
    //       );
    //     }
    // }
     rederLinks = () => {
        if(UserAuth.isAuthenticated()){
            return(
                <ul className="links" onClick={this.handleClose}>
                    <li><Link to="/">Dashbaod</Link></li>
                    <li><Link to="/login">Signin</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link onClick={this.logouthandler}>Logout</Link></li>
                </ul>
            )
        } else {
            return(
                <ul className="links" onClick={this.handleClose}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Signin</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link onClick={this.logouthandler}>Logout</Link></li>
            </ul>   
            )
        }
     }

    render(){ 
        const {user} = this.props;
        console.log('arr',user)
        return(
            <ProductConsumer>
                {value=>{
                const {sidebarOpen,handleSidebar,handleClose,headerShow}=value;
                return(
                <NavWrapper show={sidebarOpen} posit={headerShow}>
                <div className="header-container">
                    <nav>
                        <div className="logoBtn">
                            <Link to='/' 
                                onClick={handleClose}  
                            >
                                <img src={logo} alt="save-life-logo"/>
                            </Link>
                
                            <div className="btn" onClick={handleSidebar}>
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                        </div>
                        <ul className="links" onClick={this.handleClose}>
                                <li><Link to="/">Home</Link></li>
                                {user.length !== 0 ? <li><Link to="/myaccount">My Account</Link></li>:  <li><Link to="/register">Signup</Link></li>}
                                {user.length !== 0 ? <li><Link to="" onClick={this.logouthandler}>Logout</Link></li>:  <li><Link to="/login">Signin</Link></li>}
                            </ul>
                        {/* {isAuthenticated ? authLinks : guestLinks} */}
                        {/* {this.rederLinks} */}
                    </nav>
                </div>
                </NavWrapper>
                )
                }}
            </ProductConsumer>
        )
    }
}

const mapStateToProps = (store) => {
    return {
      user: store.user
  
    };
  };
  
  export default connect(mapStateToProps)(Navbar);

const NavWrapper = styled.div`
  position:sticky;
  top:0;
  z-index:6;

  background:${props=>props.posit ?'#343a40':'#343a40'};
  transition:${props=>props.posit ?'all 0.5s ease-in-out':'all 0s ease-in-out'};
  opacity:${props=>props.posit ?'1':'0.9'};

  .logoBtn img{
      display:block;
      padding:0px;
      width:180px;
      height:50px;

  }

  .header-container{
      width:100%;
      z-index:5;
  }

  .bar{
      width:35px;
      margin:5px;
      padding:2px;
      background:#fff;
  }

  .logoBtn{
      display:flex;
      justify-content:space-between;
      align-items:center;
      border-bottom:1px solid grey;
      padding:10px;
  }

  .links{
      transition:all 0.5s ease-in-out;
      position:fixed;
      top:71px;
      bottom:0px;
      left:0px;
      right:0;
      background:rgba(0,0,0,0.9);
      width:400px;
      transform:${props=>props.show ?'translate(0%)':"translate(-100%)"};

  }

  .links li a{
      color:#fff;
      display:block;
      text-transform:uppercase;
      padding:10px;
      transition:all 0.5s ease-in-out;
      border:1px solid  transparent;
      border-bottom:1px solid transparent;
  }

  .links li a:hover{
      color:#41e1b3;
      display:block;
      padding:10px 25px;
      border-bottom:1px solid #049fe1;
      background: #000000;
  }

  /* responsive mode */
   @media screen and (min-width:870px){
    .links{
        transition:all 0s ease-in-out !important;
    }
   }

   @media screen and (min-width:880px){
    .header-container{
        margin:0 auto;
        width:100%;
    }

    .btn{
        display:none;
    }

    nav{
        display:flex;
        justify-content:space-between;
        padding:10px 0;
        max-width:1180px;
        margin:0 auto;
        position:relative;

    }

    .links{
       
        transition:all 0s ease-in-out !important;
        display:flex;
        margin-right:10px;
        justify-content:space-between;
        align-items:center;
        position:relative;
        top:auto;
        background:transparent;
        width:auto;
        transform:translate(0);
    }

    .links li a{
        margin:0 2px;
        
    }

    .links li a:hover{
        margin:0 2px;
        padding:10px;
        border:1px solid #049fe1;
        background:transparent;
    }

    .logoBtn{
        border-bottom:0;
    }


   }

   @media screen and (min-width:960px){
     .logoBtn img{
         display:block;
         padding:0 0px;
     }
   }
`

