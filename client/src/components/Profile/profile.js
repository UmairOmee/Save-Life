import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions'
import { Link } from "react-router-dom"
import ProfileHeader from "./profileHeader";
import ProfileAbout from './profileAbout'
// import Spinner from '../common/spinner';
import DashboardSidebar from '../My Account/dashboardSidebar'

class Profile extends Component{

    componentDidMount(){
        this.props.getCurrentProfile(this.props.user[0]._id);
    }

    render(){
        const { profile, loading } = this.props.profile;
        const { user } = this.props;
        console.log("profile roure",profile)

        let dashboardContent;

        if( profile === null || loading ) {
            dashboardContent = "loading...";
        }else {
            // check if loggedin user has profile data
            if(Object.keys(profile).length > 0) {
                dashboardContent = (
                <div>
                    <p className="lead text-muted" >
                        Welcome <p style={{fontWeight: 'bold', display: 'inline-block'}}>{user[0].name}</p>
                    </p>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/edit-profile" className="btn btn-light mb-3 float-left">
                            Edit Profile
                            </Link>
                        </div>
                        <div className="col-md-6"/>
                    </div>
                        <ProfileHeader profile={profile} user={user[0].name}/>
                        <ProfileAbout profile={profile} user={user[0].name}/>
                </div>
                );
            }else{
                // user has logged in but no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not yet setup profile, plaese add some info.</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info"> Create profile</Link>
                    </div>
                );
            }
            
        }
        return(
                <DashboardSidebar>
                    <div className="dashboard">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="display-4">
                                        Profile
                                    </h1>
                                    {dashboardContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </DashboardSidebar>
        )
    }
}

// Profile.propTypes = {
//     getCurrentProfile: PropTypes.func.isRequired,
//     user: PropTypes.object.isRequired,
//     profile: PropTypes.object.isRequired
// }
const mapStateToProps = (state) => ({ 
    profile: state.profile,
    user: state.user
 })

export default connect(mapStateToProps, { getCurrentProfile })(Profile);