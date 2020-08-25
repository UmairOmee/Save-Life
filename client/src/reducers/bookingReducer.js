import store from "../store/store";


const initialState = {
    bookings: [],
    brequest: [],
    loading: false
}

export default function(state = initialState,  action) {
    switch(action.type) {
        case "BOOKING_LOADING" :
            return [
                ...action.payload
              ];

            case "GET_BOOKINGS":
                return {
                    ...state,
                    bookings: action.payload,
                    loading:false
            }
            case "ACCEPTED_REQUESTS":
                return {
                    ...state,
                    acceptedRequests: action.payload,
                    loding: false
                }
            case "UPDATED_REQUEST":
                return {
                    ...state,
                    updatedrequests: action.payload,
                    loading: false
                }
            case "BOOK_NOW":
                return {
                    ...state,
                    booknow: action.payload,
                    loading: false
                }
            // case GET_ALL_BOOKINGS:
            //     return {
            //         ...state,
            //         bookings: action.payload,
            //         loading: false
            // }
            case "GET_BOOKING_REQUESTS":
                return {
                    ...state,
                    brequest: action.payload,
                    loading: false
                }
        default :
        return state;
    }
}