import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Spinner from '../common/spinner';
import ProfileItem from './ProfileItem'
import DashboardSidebar from '../My Account/dashboardSidebar'
import { getProfiles } from '../../actions/profileActions'

class Users extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }
    render() {
        const { profiles, loading } = this.props.profile;
        console.log("pro", profiles);
        let profileItems;
        

        if( profiles === null || loading ) {
            profileItems = "loading";
        } else {
            if( profiles.length > 0 ) {
                profileItems = profiles.filter(profile => profile.status === "Rider").map(profile => (
                    <ProfileItem key={profile._id} profile={profile}/>
                ))
            } else {
                profileItems = <h4>No Profiles found...</h4>
            }
        }

        return (
            <DashboardSidebar>
                <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">
                                Users Profiles
                            </h1>
                            <p className="lead text-center">
                                Browse Profiles
                            </p>
                            {profileItems}
                        </div>
                    </div>
                </div>
                
            </div>
            </DashboardSidebar>
            
        )
    }
}

Users.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    user: state.user
})

export default connect(mapStateToProps, { getProfiles })(Users)
