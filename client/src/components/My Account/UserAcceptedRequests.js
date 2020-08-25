import React from 'react';
import {connect} from 'react-redux'
// import {updatedRequest} from '../../actions/bookingActions'
import {getAllBokkingList} from '../../actions/bookingActions';
import DashboardSidebar from '../My Account/dashboardSidebar'
import Nothing from '../../nothing/nothing'
import Moment from 'react-moment';

class UserAcceptedRequests extends React.Component{
    // componentDidMount(){
    //     this.props.dispatch(updatedRequest())
    // }

    componentWillReceiveProps(){
        this.props.dispatch(getAllBokkingList());
    }

    render(){
        // const {updatedrequests} = this.props.bookings
        // const filterArray = updatedrequests.filterArray(item => item.user._id === this.props.user[0]._id)
        // const filterArray = updatedrequests.filter(item => item.user._id === this.props.user[0]._id);
        // const acceptedArray = filterArray.filter(item => item.status === "accepted");
        // const filterByType = acceptedArray.filter(item => item.type === "form");
        const {bookings} = this.props;
        const formFilteredBooking = bookings.filter(item => item.type === "form")
        const filterArray = formFilteredBooking.filter(item => item.user._id === this.props.user[0]._id);
        console.log('filterArray', filterArray);
        return(
            <DashboardSidebar>
                <div>
                <h1 className="display-4 text-center">User Accepted Requets</h1>
                {filterArray.length !== 0 ? 
                filterArray.map(item => {
                    return(
                        <div className="list-group shadow p-3 mb-3 bg-white rounded row" style={{display: 'flex', justifyContent: "space-between"}}>
                            <div>
                            <p className="alert alert-success">Status: {item.status}</p>
                            <div href="#" className="list-group-item">
                                <h4 className="list-group-item-heading">Ambulance Book User: {item.user.name}
                                </h4>
                                    <div className="list-group-item-text">
                                    <p><b>Date: </b><Moment format="YYYY/MM/DD">{item.date}</Moment></p>
                                    </div>
                                    <div className="list-group-item-text">
                                    <p><b>Ambulance Book Time:</b> {item.time} pm</p>
                                    </div>
                                    <p className="list-group-item-text"><b>Phone Number:</b> {item.phonenumber}</p>
                                    <div className="list-group-item-text">
                                        <p><b>Address:</b> {item.address}</p>
                                    </div>
                                    <div>
                            </div>
                            </div>
                            
                            </div>
                        </div>
                    )
                }): <Nothing/>}
            </div>
            </DashboardSidebar>
        )
    }
}

const mapStateToProps = (store, props) => ({
    user: store.user,
    bookings: store.bookings.bookings.filter(item => item.status === "accepted"),
})


export default connect(mapStateToProps)(UserAcceptedRequests);