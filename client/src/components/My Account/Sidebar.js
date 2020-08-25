import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DashboardSidebar extends React.Component{
    
  render(){
    return(
      <div  className="d-flex container-fluid" id="wrapper">
    <div className="bg-light border-right row" style={{width: "20%" }} id="sidebar-wrapper">
      {/* <div class="sidebar-heading">Start Bootstrap </div> */}
      <div className="list-group list-group-flush col-sm">
        <Link className="list-group-item list-group-item-action bg-light" to={`/booknow`}>Istant booking</Link>
        <Link className="list-group-item list-group-item-action bg-light" to="/edit-profile">Edit Profile</Link>
      </div>
    </div>
    <div className="row" style={{width: '100%', margin: "20px"}}>
      <div className="col-sm">
      {this.props.children}
      </div>
    </div>
    </div>
    )
  }
}

// DashboardSidebar.propTypes = {
//     user : PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//     user: state.user
// })

export default connect()(DashboardSidebar);