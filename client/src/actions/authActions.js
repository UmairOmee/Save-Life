import axios from 'axios';
import UserAuth from '../authentication User/auth'
import AdminAuth from '../authentication Admin/auth';
import DriverAuth from '../authentication Driver/auth'

// Register User
export const registerUser =  (userData, history) => dispatch => {
    axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
        dispatch({
            type: 'GET_ERRORS',
            payload: err.response.data
        })
        );
}

export const addUser = ( user ) => {
  return { type: "ADD_DATA", payload: user }
}

// // Login-Get User Token
// export const loginUser = (userData, history) => dispatch => {
//     axios
//      .post('/api/users/login', userData)
//      .then(res => {
//        console.log("res",res.data)
//        if(res.data.user){
//         dispatch(addUser(res.data.user));
//         if(res.data.user.isAdmin&&res.data.user.isDriver&&res.data.user.isUser){
//               AdminAuth.login();
//               DriverAuth.login();
//               UserAuth.login()
//               console.log("admin");
//               history.push("/")               
//           console.log(AdminAuth.isAuthenticated());
//         }else if(res.dara.user.isDriver){
//                 DriverAuth.login();
//                 console.log("driver");                 
//                 history.push("/")                
//         }else{
//                     UserAuth.login()
//                     console.log("user");
//                     history.push("/")
                    
//       }
//        }
//      })
//      .catch(err => 
//         // dispatch({
//         //     type:GET_ERRORS,
//         //     payload: err.response.data
//         // })
//         console.log(err)
//         )
// }


// export const addUser = ( user ) => {
//   return { type: "ADD_DATA", payload: user }
// }