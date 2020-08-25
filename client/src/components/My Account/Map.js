import React, {useState} from 'react';
import {connect} from 'react-redux'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
  } from "react-google-maps";
// import Icon from '../../icon/abmulance.png'
import DashboardSidebar from './dashboardSidebar'

class Map extends React.Component{
   
    constructor(props) {
        super(props);
        this.state = {
           map:false,
           ulatitude:'',
           ulongitude:'',
           dlatitude:'',
           dlongitude:''
        }
    }
   componentWillReceiveProps=()=>{
    // console.log('didmount')
    if(this.props.bookings.booknow.driverCords){
this.setState({dlatitude:this.props.bookings.booknow.driverCords.latitude,dlongitude:this.props.bookings.booknow.driverCords.longitude})
       }
this.setState({ulatitude:this.props.bookings.booknow.userCords.latitude,ulongitude:this.props.bookings.booknow.userCords.longitude})
   }
      
    render(){
    //     console.log('render')
    //    console.log("latitude",typeof(this.props.bookings.booknow.userCords.latitude))
        return(
            <div>
                <GoogleMap
                    defaultZoom={10}
                    defaultCenter={{lat: 31.418715, lng: 73.079109}}
                    // defaultCenter={{
                    //     lat: this.props.bookings.booknow.userCords.latitude,
                    //     lng: this.props.bookings.booknow.userCords.longitude
                    // }}
                >
                   {this.props.bookings.booknow&&<Marker
                    
                        position={{
                            lat: this.state.dlatitude, 
                            lng: this.state.dlongitude
                        }}
                    icon={{
                        url: require('./ambulance.png'),
                        scaledSize: new window.google.maps.Size(100, 100)
                    }}
                    />}
                <Marker
                    
                    position={{
                        lat: this.state.ulatitude, 
                        lng: this.state.ulongitude
                    }}
                icon={{
                    url: require('./user-icon.png'),
                    scaledSize: new window.google.maps.Size(50, 50)
                }}
                />
                </GoogleMap>
            </div>
        )
    }
}
const mapStateToProps1 = (store) => ({
    bookings: store.bookings
})
const MapWrapped = withScriptjs(withGoogleMap(connect(mapStateToProps1)(Map)));

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           map:false,
           latitude:'',
           longitude:''
        }
    }
    componentDidMount=()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>
              this.setState({latitude:position.coords.latitude,longitude:position.coords.longitude})
              );
          } else {
           console.log("Geolocation is not supported by this browser.");
          }
        }
        BookNow=()=>{
            fetch("/api/booking/booknow", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                   latitude:this.state.latitude,
                   longitude:this.state.longitude,
                   type: "map",
                   id: this.props.user[0]._id
                })
            }).then((res) => res.json()).then((res) => {
                console.log('book now', res.newdata)
                this.props.dispatch({
                    type: "BOOK_NOW",
                    payload: res.newdata
                })
                if(res.success){
                    this.setState({map:true})
                    setInterval(() => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position)=>
                            fetch("/api/booking/booknowupdate", {
                                method: 'POST',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                   latitude:position.coords.latitude,
                                   longitude:position.coords.longitude,
                                   id: this.props.bookings.booknow._id
                                })
                            }).then((res) => res.json()).then((res) => {
                                console.log('book now', res.newdata)
                                if(res.newdata.status=="completed"){
                                    this.setState({map:false})
                                    this.props.dispatch({
                                        type: "BOOK_NOW",
                                        payload:{}
                                    })
                                    
                                }else{
                                this.props.dispatch({
                                    type: "BOOK_NOW",
                                    payload: res.newdata
                                })}}))
                              
                          } else {
                           console.log("Geolocation is not supported by this browser.");
                          }
                       }, 1000);
                }
            }).catch((err) => console.log(err));

          
        }
  render(){
      console.log(this.state)
    return (
        <DashboardSidebar>
      {this.state.map?<div style={{ width: "100%", height: "100vh" }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${"AIzaSyCsmsHCriLejGZoPMuBE55OOenNLJxQVz8"
          }`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>:( <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Emergency Booking</h1>
                  <p className="lead text-center">Just Click on Book Now Button For Booking</p>
                  <p className="lead text-center">This Emergency Booking For Serious Cases and the price of this booking is greater than regular one.</p>
                  <div className="d-flex justify-content-center">
                  <button className="btn btn-danger" onClick={this.BookNow}>Book Now</button>
                  </div>
                  
          </div>
          </div>
          </div>)}
      </DashboardSidebar>
    );
  }
}

const mapStateToProps = (store) => ({
    user: store.user,
    bookings: store.bookings
})

export default connect(mapStateToProps)(App);