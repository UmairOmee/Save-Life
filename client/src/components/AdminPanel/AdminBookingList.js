import React from 'react';
import { connect } from 'react-redux'
import { getAllBokkingList } from '../../actions/bookingActions'
import {approveRequest} from '../../actions/bookingActions'
import DashboardSidebar from '../My Account/dashboardSidebar'

class AllBookingList extends React.Component{
    componentDidMount(){
        this.props.dispatch(getAllBokkingList())
    }

    approveNow = (data) => {
        this.props.dispatch(approveRequest(data))
    }

    render(){
        const {bookings} = this.props.bookings;
        return(
            <DashboardSidebar>
                <div>
                {bookings ? bookings.map(booking => {
                    return(
                        <div className="list-group" style={{display: 'flex', justifyContent: "space-between"}}>
                            <div>
                            <div href="#" className="list-group-item">
                                <h4 className="list-group-item-heading">{booking.user.name}
                                </h4>
                    <p className="list-group-item-text">Phone Number: {booking.phonenumber}</p>
                    <div className="list-group-item-text">
                        <p>Address: {booking.address}</p>
                    </div>
                    <div>
                            <button 
                                type="button" 
                                className="btn btn-success" 
                                onClick={() => this.approveNow(booking)}
                            >
                                Forward
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
    bookings: state.bookings,
    user: state.user
 })

export default connect(mapStateToProps)(AllBookingList);