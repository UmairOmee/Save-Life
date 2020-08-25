import React, { Component } from 'react'
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty'

class ProfileAbout extends Component {
    render() {
        const { profile, user } = this.props;

        // Get firstname
        // const firstName = user.trim().split(' ')[0];
        // const firstName = "Ali";

        return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{user}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{user} does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Phone Number</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {profile.phonenumber}
              </div>
            </div>
          </div>
        </div>
      </div>
        )
    }
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout;