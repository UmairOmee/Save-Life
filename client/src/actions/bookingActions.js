import axios from 'axios';


export const setBooking= (data) => {
    return { type: "BOOKING_LOADING", payload:  data
   }
  }
  
// Booking Request by User
export const bookingRequest =  (bookingData, history) => dispatch => {
    axios
    .post('/api/booking/bookingrequest', bookingData)
    .then(res => {
        dispatch({
            type: "GET_BOOKINGS",
            payload: res.data.bookings
        })
        history.push('/myaccount')}
    )
    .catch(err => 
        console.log(err)
        // dispatch({
        //     type: GET_ERRORS,
        //     payload: err.response.data
        // })
        );
}

export const driverAcceptedRequets = (id) => dispatch => {
    axios
    .post('/api/booking/driveracceptedrequests', {id})
    .then(res => {
        console.log("accepted-requets", res)
        dispatch({
            type: "GET_BOOKINGS",
            payload: res.data.bookings
        })
    }
        )
    .catch(err => console.log(err))
}

export const drivercompletedRequets = (id) => dispatch => {
    axios
    .post('/api/booking/drivercompletedrequests', {id})
    .then(res => {
        dispatch({
            type: "GET_BOOKINGS",
            payload: res.data.bookings
        })
        console.log("completed-requets", res)}
        )
    .catch(err => console.log(err))   
}

export const completeRequest = (id) => dispatch => {
    axios
    .put('/api/booking/compelterequest', {id})
    .then(res => {
        console.log("complete", res)
        dispatch(updatedRequest())
    })
    .catch(err => console.log(err))
}

export const updatedRequest = () => dispatch => {
    axios.get('/api/booking/updatedrequets')
    .then(res => {
        console.log(res.data)
        dispatch({
            type: "UPDATED_REQUEST",
            payload: res.data.data
        })
    })
    .catch(err => console.log(err))
}


export const approveRequestByDriver = (data) => dispatch => {
    axios
    .put('/api/booking/bq', data)
    .then(res => {
        console.log(res.data)
        dispatch({
            type: "ACCEPTED_REQUESTS",
            payload: res.data.data
        })
    })
    .catch(err => console.log(err))
}


// /getBookingRequests/:user_id

export const getBookingRequests = (id) => dispatch => {
    axios
    .get(`/api/booking/getBookingRequests/${id}`)
    .then(res => 
        dispatch({
            type: "GET_BOOKING_REQUESTS",
            payload: res.data
        }))
    .catch(err => console.log(err))
}

// /api/booking/allbooking

export const getAllBokkingList = () => dispatch => {
    axios
    .get('/api/booking/allbooking')
    .then(res => 
        dispatch({
            type: "GET_BOOKINGS",
            payload: res.data
        }))
    .catch(err => console.log(err))
}

export const approveRequest = (data) => dispatch => {
    axios
    .put('/api/booking/approverequest', data)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}