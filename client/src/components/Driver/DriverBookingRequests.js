import React, { Component } from 'react'
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import Spinner from '../common/spinner';
import { getBookingRequests, approveRequestByDriver } from '../../actions/bookingActions'
import DashboardSidebar from '../My Account/DriverBookingRequests';
import Moment from 'react-moment';

class DriverBooking extends Component {
    componentDidMount(){
        this.props.dispatch(getBookingRequests(this.props.user[0]._id))
    }

    
    approveRequestByDriverHandler = (id, request) => {
        const requestData ={
            id: id,
            request: request
        }
        this.props.dispatch(approveRequestByDriver(requestData))
    }

    render() {
        const {brequest} = this.props.bookings;
        const request = brequest.request;
        console.log(this.props.user[0]._id)
              
        return (
                <DashboardSidebar>
                    <div>
                    {request ? request.map(item => {
                        return(
                            <div key={item._id} className="list-group" style={{display: 'flex', justifyContent: "space-between"}}>
                            <div>
                            <div className="list-group-item">
                                <h4 className="list-group-item-heading">Booking Request by: {item.user.name}
                                </h4>
                    <p className="list-group-item-text">Phone Number: {item.phonenumber}</p>
                    <div className="list-group-item-text">
                        <p>Address: {item.address}</p>
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-success" 
                        onClick={() => this.approveRequestByDriverHandler(this.props.user[0]._id, item)}
                    >
                            Approve
                    </button>
                    </div>
                    </div>
                    </div>
                        )
                    }
                    ) : "loading..."}
                </div>
                </DashboardSidebar>
        )
    }
}


const mapStateToProps = state => ({
    bookings: state.bookings,
    user: state.user
})

export default connect(mapStateToProps)(DriverBooking)
