// import isEmpty from '../validation/is-empty'
// import { SET_CURRENT_USER, REGISTER_USER } from '../actions/types'

// const initialState = {
//     isAuthenticated: false,
//     user: {}
// }

const collection = [];

export default function(state = collection, action) {
    switch(action.type) {
        case 'ADD_DATA':
            return [
                action.payload
            ];
        // case REGISTER_USER:
        //     return {...state, register: action.payload}
        // case SET_CURRENT_USER:
        //     return {
        //         ...state,
        //         isAuthenticated: !isEmpty(action.payload),
        //         user: action.payload
        //     }
        default :
        return state;
    }
}