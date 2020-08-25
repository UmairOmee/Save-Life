import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import DashboardSidebar from '../My Account/dashboardSidebar'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty'

class CreateProfile extends Component {
    state = {
        displaySocialInputs: '',
        username: '',
        status: '',
        phonenumber: '',
        city: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    }

    componentDidMount() {
        this.props.getCurrentProfile(this.props.user[0]._id);
    }
    
    componentWillReceiveProps(nextProps) {
      if(nextProps.errors) {
        this.setState({ errors: nextProps.errors })
      }

      

      if(nextProps.profile.profile) {
          const profile = nextProps.profile.profile;

          

          // If profile fields doesnot exist, make empty string
          profile.username = !isEmpty(profile.username) ? profile.username : '';
        //   profile.status = !isEmpty(profile.status) ? profile.status : '';
          profile.phonenumber = !isEmpty(profile.phonenumber) ? profile.phonenumber : '';
          profile.city = !isEmpty(profile.city) ? profile.city : '';
          profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
          profile.social = !isEmpty(profile.social) ? profile.social : {};
          profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
          profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
          profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
          profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
          profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';

          // Set component field State
          this.setState({
                username: profile.username,
                // status: profile.status,
                phonenumber: profile.phonenumber,
                city:  profile.city,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
          })
      }
    }

    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }
  

    onSubmit = (e) => {
        e.preventDefault();

        const profileData = {
          username: this.state.username,
          status: this.state.status,
          phonenumber: this.state.phonenumber,
          city: this.state.city,
          bio: this.state.bio,
          twitter: this.state.twitter,
          facebook: this.state.facebook,
          linkedin: this.state.linkedin,
          youtube: this.state.youtube,
          instagram: this.state.instagram
        }
        this.props.createProfile( profileData, this.props.history )
    }
    

    render() {
        const { errors, displaySocialInputs } = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
              <div>
                <InputGroup
                  placeholder="Twitter Profile URL"
                  name="twitter"
                  icon="fa fa-twitter"
                  value={this.state.twitter}
                  onChange={this.onChange}
                  error={errors.twitter}
                />
      
                <InputGroup
                  placeholder="Facebook Page URL"
                  name="facebook"
                  icon="fa fa-facebook"
                  value={this.state.facebook}
                  onChange={this.onChange}
                  error={errors.facebook}
                />
      
                <InputGroup
                  placeholder="Linkedin Profile URL"
                  name="linkedin"
                  icon="fa fa-linkedin"
                  value={this.state.linkedin}
                  onChange={this.onChange}
                  error={errors.linkedin}
                />
      
                <InputGroup
                  placeholder="YouTube Channel URL"
                  name="youtube"
                  icon="fa fa-youtube"
                  value={this.state.youtube}
                  onChange={this.onChange}
                  error={errors.youtube}
                />
      
                <InputGroup
                  placeholder="Instagram Page URL"
                  name="instagram"
                  icon="fa fa-instagram"
                  value={this.state.instagram}
                  onChange={this.onChange}
                  error={errors.instagram}
                />
              </div>
      );
    }              
               // Select options for status
               const options = [
                 {
                   label: "* Select Professional Status",
                   value: 0
                 },
                 { label: "Rider", value: "Rider" },
                 {
                   label: "Driver",
                   value: "Driver"
                 }
               ];
               return (
                 <DashboardSidebar>
                  <div className="create-profile">
                   <div className="container">
                     <div className="row">
                       <div className="col-md-8 m-auto">
                         <h1 className="display-4 text-center">
                           Edit Profile
                         </h1>
                         <small className="d-block pb-3">
                           * = required fields
                         </small>
                         <form onSubmit={this.onSubmit}>
                           <TextFieldGroup
                             placeholder="* Profile Username"
                             name="username"
                             value={this.state.username}
                             onChange={this.onChange}
                             error={errors.username}
                             info="A unique username for your profile URL. Your full name, company name, nickname"
                           />
                           {/* <SelectListGroup
                             placeholder="Status"
                             name="status"
                             value={this.state.status}
                             onChange={this.onChange}
                             options={options}
                             error={errors.status}
                             info="Give us an idea of where you are at in your career"
                           /> */}
                           <TextFieldGroup
                             placeholder="* Phone Number"
                             name="phonenumber"
                             value={this.state.phonenumber}
                             onChange={this.onChange}
                             error={errors.phonenumber}
                             info="Your contact number"
                           />
                           <TextFieldGroup
                             placeholder="City"
                             name="city"
                             value={this.state.city}
                             onChange={this.onChange}
                             error={errors.city}
                             info="City or city & state suggested (eg. Gojra, Lahore)"
                           />
                            <TextAreaFieldGroup
                             placeholder="Short Bio"
                             name="bio"
                             value={this.state.bio}
                             onChange={this.onChange}
                             error={errors.bio}
                             info="Tell us a little about yourself"
                            />
                            
                            
                            <div className="mb-3">
                            <button
                            type="button"
                            onClick={() => {
                            this.setState(prevState => ({
                            displaySocialInputs: !prevState.displaySocialInputs
                            }));
                            } }
                            className="btn btn-light"
                            >
                            Add Social Network Links
                           </button>
                           <span className="text-muted">Optional</span>
                           </div>
                           {socialInputs}
                           <input
                           type="submit"
                           value="Submit"
                           className="btn btn-info btn-block mt-4"
                         />
                         </form>
                       </div>
                     </div>
                   </div>
                 </div>
              </DashboardSidebar>
               );
             }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    user: state.user,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile));
