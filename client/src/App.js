import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import { updatedRequest } from './actions/bookingActions';
import {getProfiles} from './actions/profileActions'
import {getBookingRequests} from './actions/bookingActions'
import {getAllBokkingList} from './actions/bookingActions'
import Loading from './loading/loading'
import Homepage from '../src/components/Homepage/Homepage'
import Register from '../src/components/Login-Register/register'
import Navbar from '../src/components/Homepage/Navbar'
import Footer from '../src/components/Homepage/Footer'
import CreateProfile from '../src/components/Profile/create-profile'
import Profile from '../src/components/Profile/profile'
import EditProfile from '../src/components/Profile/edit-profile'
import Login from '../src/components/Login-Register/login'
import MyAccount from '../src/components/My Account/myaccount'
import AddDriver from '../src/components/AdminPanel/AddDriver'
import AddBookingRequest from '../src/components/My Account/AddBookingRequest';
import AdminBookingList from '../src/components/AdminPanel/AdminBookingList'
import DriverBookingRequests from '../src/components/Driver/DriverBookingRequests'
import UserAcceptedRequests from '../src/components/My Account/UserAcceptedRequests'
import DriverInstantRequests from './components/Driver/DriverInstantRequests'
import ProtectedLogin from '../src/protected Routes/login'
import AllUserProfiles from '../src/components/AdminPanel/AllUsersList'
import DriverAcceptedRequests from '../src/components/Driver/DriverAcceptedRequests'
import UserPendingRequests from '../src/components/My Account/UserPendingRequests';
import UserCompletedRequests from '../src/components/My Account/UserCompletedRequests'
import DriverSimpleRequests from '../src/components/Driver/DriverSimpleRequests'
import DriverCompletedRequets from '../src/components/Driver/DriverCompletedRequets'
import AllDriverList from '../src/components/AdminPanel/AllDriverList'
import Map from '../src/components/My Account/Map'
import AdminHome from '../src/components/AdminPanel/AdminHome'
import AdminRoute from '../src/protected Routes/adminProtectedRoute'
import DriverRoute from '../src/protected Routes/DriverProtectedRoute'
import Account from '../src/protected Routes/Account'
import AuthUser from "../src/authentication User/auth";
import AuthAdmin from "../src/authentication Admin/auth";
import AuthDriver from "../src/authentication Driver/auth";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        loading: true
    }

}

// Um792871$heroku

componentDidMount = () => {
  fetch('/getAll', { method: 'GET' })
            .then((res) => res.json())
            .then((json) => {
                this.setState({ loading: false });
                console.log(json)
            })
            .catch((error) => console.log(error))
            console.log('json.data');

            this.props.dispatch(updatedRequest());
            this.props.dispatch(getProfiles())
            // this.props.dispatch(getBookingRequests())
            this.props.dispatch(getAllBokkingList())
}

  render(){
    const { } = this.state
        // console.log(auth2.isAuthenticated());
        if (this.state.loading) {
            return (<Loading/>)
        } else {
            return (
      <div>
        <BrowserRouter>
        <Navbar/>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Account exact path="/create-profile" component={CreateProfile} />
            <Account exact path="/profile/:id" component={Profile}/>
            <Account exact path="/myaccount" component={MyAccount}/>
            <Account exact path="/edit-profile" component={EditProfile}/>
            <AdminRoute exact path="/add-driver" component={AddDriver}/>
            <AdminRoute exact path="/all-drivers" component={AllDriverList}/>
            <AdminRoute exact path="/admin-booking-list" component={AdminBookingList}/>
            <Account exact path="/add-booking-request" component={AddBookingRequest}/>
            <DriverRoute exact path="/driver-booking-requests" component={DriverBookingRequests}/>
            <Account exact path="/user-accepted-requests" component={UserAcceptedRequests}/>
            <DriverRoute exact path="/driver-accepted-requests" component={DriverAcceptedRequests}/>
            <Account exact path="/user-pending-requests" component={UserPendingRequests}/>
            <Account exact path="/user-completed-requets" component={UserCompletedRequests}/>
            <Account exact path="/all-users-profiles" component={AllUserProfiles} />
            <DriverRoute exact path="/driver-instant-requests" component={DriverInstantRequests}/>
            <DriverRoute exact path="/driver-simple-requests" component={DriverSimpleRequests}/>
            <DriverRoute exact path="/driver-completed-requets" component={DriverCompletedRequets}/>
            <Account exact path="/map" component={Map}/>
            <ProtectedLogin path='/login' component={Login} />
            <ProtectedLogin path='/register' component={Register} />
            <AdminRoute path="/admin" component={AdminHome}/>
          </Switch>
          <Footer/>
        </BrowserRouter>
      </div>
    )
            }
  }
}

const mapStateToProps = (store) => ({
  user: store.user
})

export default connect(mapStateToProps)(App);