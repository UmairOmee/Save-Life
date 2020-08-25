// import React from 'react';
// import { connect } from 'react-redux';
// import { getBookingList } from '../../actions/bookingActions'
// import DashboardSidebar from '../dashboard/DashboardSidebar'
// import BookingListItem from './BookingListItem'

// class BookingsList extends React.Component{
//     componentDidMount(){
//         console.log("component called")
//         this.props.dispatch(getBookingList())
//     }
//     render(){
//         const {bookings } = this.props.bookings
//         console.log(bookings)
//         return(
//             <DashboardSidebar>
//                 <div>
//                     {bookings.map(booking => 
//                         <BookingListItem booking={booking}></BookingListItem>
                        
//                     )}
//                 </div>
//             </DashboardSidebar>
//         )
//     }
// }

// // Profile.propTypes = {
// //     getCurrentProfile: PropTypes.func.isRequired,
// //     auth: PropTypes.object.isRequired,
// //     profile: PropTypes.object.isRequired
// // }
// const mapStateToProps = (state) => ({ 
//     bookings: state.bookings,
//     auth: state.auth
//  })

// export default connect(mapStateToProps)(BookingsList);