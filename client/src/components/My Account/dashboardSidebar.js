import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './dashboardSidebar.css'

class DashboardSidebar extends React.Component{
    
  render(){
    const { user } = this.props;

      const adminRoutes = (
          <div>
        <Link className="list-group-item list-group-item-action bg-light" to="/add-driver">Add Driver</Link>
        <Link className="list-group-item list-group-item-action bg-light" to="/all-users-profiles">Users</Link>
        <Link className="list-group-item list-group-item-action bg-light" to="/all-drivers">Drivers</Link>
        {/* <Link className="list-group-item list-group-item-action bg-light" to="drivers">Drivers</Link> */}
        {/* <Link className="list-group-item list-group-item-action bg-light" to="/admin-booking-list">Admin Booking List</Link> */}
        </div>
      );

      const driverRoutes =(
        <div>
          {/* <Link className="list-group-item list-group-item-action bg-light" to="/driver-booking-requests">Driver Booking Requests</Link> */}
          <Link className="list-group-item list-group-item-action bg-light" to="/driver-simple-requests">Driver Simple Requests</Link>
          <Link className="list-group-item list-group-item-action bg-light" to="/driver-instant-requests">Driver Emergency Requests</Link>
          <Link className="list-group-item list-group-item-action bg-light" to="/driver-accepted-requests">Driver Accepted Requests</Link> 
          <Link className="list-group-item list-group-item-action bg-light" to="/driver-completed-requets">Driver Completed Requests</Link>
          <Link className="list-group-item list-group-item-action bg-light" to="/driver-completed-requets">Driver Special Requests</Link>
        </div>
      )

      const userRoutes =(
        <div>
          <Link className="list-group-item list-group-item-action bg-light" to="/add-booking-request">Booking</Link>
          <Link className="list-group-item list-group-item-action bg-light" to="/map">User Emergency Booking</Link>
          <Link className="list-group-item list-group-item-action bg-light" to="/user-pending-requests">User Pending Requests</Link>
          <Link className="list-group-item list-group-item-action bg-light" to="/user-accepted-requests">User Accepted Requests</Link>
          <Link className="list-group-item list-group-item-action bg-light" to="/user-completed-requets">User completed Requests</Link>
        </div>
      )

    return(
      <div  className="d-flex container-fluid responsive" id="wrapper">
    <div className="bg-light border-right row sidebar" style={{width: "20%"}} id="sidebar-wrapper">
      {/* <div class="sidebar-heading">Start Bootstrap </div> */}
      <div className="list-group list-group-flush col-sm">
        <Link className="list-group-item list-group-item-action bg-light" to={`/profile/${user[0]._id}`}>My Account</Link>
        <Link className="list-group-item list-group-item-action bg-light" to="/edit-profile">Edit Profile</Link>
        {/* <Link className="list-group-item list-group-item-action bg-light" to="/bookinglist">User Booking List</Link> */}
        {user[0].isUser ? userRoutes : ""}
        {user[0].isDriver ? driverRoutes : ""}
        {user[0].isAdmin ? adminRoutes : ""}
        <Link className="list-group-item list-group-item-action bg-light" to="/login">Logout</Link>
      </div>
    </div>
    <div className="row main" style={{width: '75%', margin: "20px"}}>
      <div className="col-sm">
      {this.props.children}
      </div>
    </div>
    </div>
    )
  }
}

DashboardSidebar.propTypes = {
    user : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(DashboardSidebar);