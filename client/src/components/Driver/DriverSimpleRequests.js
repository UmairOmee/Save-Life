import React from 'react';
import { connect } from 'react-redux'
// import { getAllBokkingList } from '../../actions/bookingActions'
import {driverAcceptedRequets} from '../../actions/bookingActions'
import DashboardSidebar from '../My Account/dashboardSidebar'
import Moment from 'react-moment';

class DriverSimpleRequests extends React.Component{

    driverAcceptedRequests = (id) => {
        this.props.dispatch(driverAcceptedRequets(id))
    }

    render(){
        const {bookings} = this.props;
        const formFilteredBooking = bookings.filter(item => item.type === "form")
        return(
            <DashboardSidebar>
                <div>
                <h1 className="display-4 text-center">Driver Simple Requets</h1>
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
                                        onClick={() => this.driverAcceptedRequests(booking._id)}
                                    >
                                        Accept
                                    </button>
                            </div>
                            </div>
                            
                            </div>
                        </div>
                    //     <div className="list-group" style={{display: 'flex', justifyContent: "space-between"}}>
                    //         <div>
                    //         <div href="#" className="list-group-item">
                    //             <h4 className="list-group-item-heading">Ambulance Book User: {booking.user.name}
                    //             </h4>
                    // <p className="list-group-item-text">Phone Number: {booking.phonenumber}</p>
                    // <div className="list-group-item-text">
                    //     <p>Address: {booking.address}</p>
                    // </div>
                    // <div className="list-group-item-text">
                    // <p>Address: {booking.status}</p>
                    // </div>
                    // <div>
                    //         <button 
                    //             type="button" 
                    //             className="btn btn-success" 
                    //             onClick={() => this.driverAcceptedRequests(booking._id)}
                    //         >
                    //             Accept
                    //         </button>
                    //         </div>
                    //         </div>
                            
                    //         </div>
                    //     </div>
                    )
                }): "loading..."}
            </div>
            </DashboardSidebar>
        )
    }
}


const mapStateToProps = (state) => ({ 
    bookings: state.bookings.bookings.filter(item => item.status === "pending"),
    user: state.user
 })

export default connect(mapStateToProps)(DriverSimpleRequests);