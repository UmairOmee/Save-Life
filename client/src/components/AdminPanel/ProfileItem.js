import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
// import {deleteAccount} from '../../actions/profileActions'
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class Profileitem extends Component {
    // onDeleteClick = (id) => {
    //     console.log("clicked");
    //     this.props.dispatch(deleteAccount(id));
    //   }

    render() {
        const { profile } = this.props;
        console.log('users-pro',profile)
        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <img src={profile.pic} alt="" className="rounded-circle"/>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        {console.log('user', profile.user)}
                        <h3>{profile.user.name === null ? "looding!" :profile.user.name}</h3>
                        <p>
                            {profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
                        </p>
                        <p>
                            {profile.city} {isEmpty(profile.city) ? null : (<span>at {profile.city}</span>)}
                        </p>
                        {/* <Link to={`/profile/${profile.username}`} className="btn btn-info">
                            View Profile    
                         </Link> */}
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                    {/* <button type="button" className="btn btn-danger">Delete</button> */}
                    <div style={{ marginBottom: '60px' }} />
                        {/* <button className="btn btn-danger"onClick={() => this.onDeleteClick(profile.user._id)}>
                            Delete Account
                        </button> */}
                    </div>


                </div>
                
            </div>
        )
    }
}

Profileitem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default connect()(Profileitem);
