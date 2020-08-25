import React from 'react';
import DashboardSidebar from '../My Account/dashboardSidebar'
import {connect} from 'react-redux'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    // InfoWindow
  } from "react-google-maps";
import {getAllBokkingList} from '../../actions/bookingActions'
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
   componentDidMount=()=>{
       if(this.props.bookings.booknow.driverCords){
           this.setState({dlatitude:this.props.bookings.booknow.driverCords.latitude,dlongitude:this.props.bookings.booknow.driverCords.longitude})
        }
        this.setState({ulatitude:this.props.bookings.booknow.userCords.latitude,ulongitude:this.props.bookings.booknow.userCords.longitude})
    }

    // completeUserRequest = () => {

    // }
    
    render(){
        
        // console.log('dd')
        // console.log("latitude",typeof(this.props.bookings.booknow.userCords.latitude))
        return(
            <div>
                <GoogleMap
                    defaultZoom={10}
                    defaultCenter={{lat: 31.418715, lng: 73.079109}}
                    // defaultCenter={{
                    //     lat: this.props.bookings.booknow.driverCords.latitude,
                    //     lng: this.props.bookings.booknow.driverCords.longitude
                    // }}
                >
                    <Marker
                    
                        position={{
                            lat: this.state.dlatitude, 
                            lng: this.state.dlongitude
                        }}
                    icon={{
                        url: require('./ambulance.png'),
                        scaledSize: new window.google.maps.Size(100, 100)
                    }}
                    />
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
                {/* <button type="button" onClick={}>Completed</button> */}
                </GoogleMap>
            </div>
        )
    }
}
const mapStateToProps1 = (store) => ({
    bookings: store.bookings
})
const MapWrapped = withScriptjs(withGoogleMap(connect(mapStateToProps1)(Map)));

class DriverInstantRequest extends React.Component{
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
        BookNow=(id)=>{
            fetch("/api/booking/booknowdriver", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                   latitude:this.state.latitude,
                   longitude:this.state.longitude,
                   driverid: this.props.user[0]._id,
                   id: id,
                   status:"accepted"
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
                            fetch("/api/booking/booknowupdatedriver", {
                                method: 'POST',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                   latitude:position.coords.latitude,
                                   longitude:position.coords.longitude,
                                   id: this.props.bookings1.booknow._id
                                })
                            }).then((res) => res.json()).then((res) => {
                                console.log('book now', res.newdata)

                                this.props.dispatch({
                                    type: "BOOK_NOW",
                                    payload: res.newdata
                                })}))
                              
                          } else {
                           console.log("Geolocation is not supported by this browser.");
                          }
                       }, 1000);
                }
            }).catch((err) => console.log(err));}
            completedhandler=()=>{
                fetch("/api/booking/maprequestend", {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: this.props.bookings1.booknow._id,
                       status: "completed"
                    })
                }).then((res) => res.json()).then((res) => {
                 if (res.success){
                     this.setState({map:false})
                     this.props.dispatch({
                         type: "BOOK_NOW",
                         payload: {}
                     })
                     this.props.dispatch(getAllBokkingList())
                }
                        })

            }
    render(){
        return(
            <DashboardSidebar>
            <div>
                {this.state.map?<div style={{ width: "100%", height: "100vh" }}>
            <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${"AIzaSyCsmsHCriLejGZoPMuBE55OOenNLJxQVz8"
            }`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
            <button 
                className="btn btn-primary"
                onClick={this.completedhandler} 
                style={{position:"absolute",zIndex:10000,bottom:50,left:30}}>
            completed
            </button>
        </div>:
            this.props.bookings.map(item => {
                return(
                    // <div className="list-group shadow p-3 mb-3 bg-white rounded row" style={{display: 'flex', justifyContent: "space-between"}}>
                    //         <div>
                    //         <p className="alert alert-success">Status: {booking.status}</p>
                    //         <div href="#" className="list-group-item">
                    //             <h4 className="list-group-item-heading">Ambulance Book User: {booking.user.name}
                    //             </h4>
                    //                 <div className="list-group-item-text">
                    //                 <p><b>Date: </b><Moment format="YYYY/MM/DD">{booking.date}</Moment></p>
                    //                 </div>
                    //                 <div className="list-group-item-text">
                    //                 <p><b>Ambulance Book Time:</b> {booking.time} pm</p>
                    //                 </div>
                    //                 <p className="list-group-item-text"><b>Phone Number:</b> {booking.phonenumber}</p>
                    //                 <div className="list-group-item-text">
                    //                     <p><b>Address:</b> {booking.address}</p>
                    //                 </div>
                    //                 <div>
                    //                 <button 
                    //                     type="button" 
                    //                     className="btn btn-success" 
                    //                     onClick={() => this.BookNow(item._id)}
                    //                 >
                    //                     Accept
                    //                 </button>
                    //         </div>
                    //         </div>
                            
                    //         </div>
                    //     </div>
                    <div key={item._id} className="list-group" style={{display: 'flex', justifyContent: "space-between"}}>
        <div>
        <div className="list-group-item shadow p-3 mb-3 bg-white rounded row">
            <h4 className="list-group-item-heading">Booking Request by: {item.user.name}
            </h4>
<button 
                        type="button" 
                        className="btn btn-success" 
                        onClick={() => this.BookNow(item._id)}
                    >
                            Accept
                    </button>
</div>
</div>
</div>
                )
            })
        
        }
            </div>
            </DashboardSidebar>
        )
    }
}

const mapStateToProps = (store) => ({
    bookings: store.bookings.updatedrequests.filter((item)=>item.type=="map"&&item.status=="pending"),
    bookings1: store.bookings,
    user: store.user,
})

export default connect(mapStateToProps)(DriverInstantRequest)