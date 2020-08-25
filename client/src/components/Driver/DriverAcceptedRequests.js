import React from 'react';
import { connect } from 'react-redux'
// import { getAllBokkingList } from '../../actions/bookingActions'
import {drivercompletedRequets} from '../../actions/bookingActions'
import DashboardSidebar from '../My Account/dashboardSidebar'
import Moment from 'react-moment';

class DriverAcceptedRequests extends React.Component{

    driverCompletedRequests = (id) => {
        this.props.dispatch(drivercompletedRequets(id))
    }

    render(){
        const {bookings} = this.props;
        const formFilteredBooking = bookings.filter(item => item.type === "form")
        return(
            <DashboardSidebar>
                <div>
                <h1 className="display-4 text-center">Driver Accepted Requets</h1>
                {formFilteredBooking ? formFilteredBooking.map(booking => {
                    return(
                        <div className="list-group shadow p-3 mb-3 bg-white rounded row" style={{display: 'flex', justifyContent: "space-between"}}>
                            <div>
                            <p className="alert alert-success">Status: {booking.status}</p>
                            <div href="#" className="list-group-item">
                                <h4 className="list-group-item-heading">Ambulance Book User: {booking.user.name}
                                </h4>
                                    <div className="list-group-item-text">
                                    <p><b>Date: </b><Moment format="YYYY/MM/DD">{booking.date}</Moment></p>
                                    </div>
                                    <div className="list-group-item-text">
                                    <p><b>Ambulance Book Time:</b> {booking.time} pm</p>
                                    </div>
                                    <p className="list-group-item-text"><b>Phone Number:</b> {booking.phonenumber}</p>
                                    <div className="list-group-item-text">
                                        <p><b>Address:</b> {booking.address}</p>
                                    </div>
                                    <div>
                                        <button 
                                            type="button" 
                                            className="btn btn-success" 
                                            onClick={() => this.driverCompletedRequests(booking._id)}
                                        >
                                            Complete
                                        </button>
                            </div>
                            </div>
                            
                            </div>
                        </div>
                    )
                }): "loading..."}
            </div>
            </DashboardSidebar>
        )
    }
}


const mapStateToProps = (state) => ({ 
    bookings: state.bookings.bookings.filter(item => item.status === "accepted"),
    user: state.user
 })

export default connect(mapStateToProps)(DriverAcceptedRequests);
