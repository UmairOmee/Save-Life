import React from 'react';
// import User from '../img/user.png';
import isEmpty from '../../validation/is-empty'

class ProfileHeader extends React.Component {
    render(){
        const {profile, user} = this.props;
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                            <div className="col-4 col-md-3 m-auto">
                                <img
                                    style={{width:"200", height: "100", textAlign:"center"}}
                                    className="rounded-circle"
                                    src={profile.pic}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="text-center">
              <h1 className="display-4 text-center">{user}</h1>
              {/* <h3>{profile.status}</h3> */}

              <p className="lead text-center">
                {profile.status}{' '}
                              </p>
              {isEmpty(profile.city) ? null : <p>{profile.city}</p>}
              <p>
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    rel="noopener noreferrer" 
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    {/* <i className="fab fa-twitter fa-2x" /> */}
                    <i className="fa fa-twitter fa-2x" aria-hidden="true"></i>
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    rel="noopener noreferrer" 
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
                    {/* <i className="fab fa-facebook fa-2x" /> */}
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    rel="noopener noreferrer" 
                    href={profile.social.linkedin}
                    target="_blank"
                  >
                    {/* <i className="fab fa-linkedin fa-2x" /> */}
                    <i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i>
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    rel="noopener noreferrer" 
                    href={profile.social.youtube}
                    target="_blank"
                  >
                    {/* <i className="fab fa-youtube fa-2x" /> */}
                    <i className="fa fa-youtube-play fa-2x" aria-hidden="true"></i>
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    rel="noopener noreferrer" 
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    {/* <i className="fab fa-instagram fa-2x" /> */}
                    <i className="fa fa-instagram fa-2x" aria-hidden="true"></i>
                  </a>
                )}
              </p>
            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileHeader;