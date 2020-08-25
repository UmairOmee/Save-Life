import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
// import SelectListGroup from '../common/SelectListGroup'
import { createProfile } from '../../actions/profileActions'
// import isEmpty from '../../validation/is-empty'
// import DashboardSidebar from '../dashboard/DashboardSidebar'

class CreateProfile extends Component {
    state = {
        displaySocialInputs: '',
        username: '',
        status: '',
        phonenumber: '',
        city: '',
        bio: '',
        image: '',
        url: undefined,
        // url: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.errors) {
        this.setState({ errors: nextProps.errors })
      }
    }

    onSubmit = (e) => {
      e.preventDefault();

      if(this.state.image){
        const data = new FormData();
        data.append("file", this.state.image);
        data.append("upload_preset", "Insta-clone");
        data.append("cloud_name", "do3itn6kz");
        fetch('https://api.cloudinary.com/v1_1/do3itn6kz/image/upload', {
            method: 'post',
            body: data
        })
        .then(res => res.json())
        .then(data => {
          this.setState({url: data.url})
          console.log("data.url", data.url)
      })
        .catch(err => console.log(err))
    
  }
        
        const profileData = {
          id: this.props.user[0]._id,
          username: this.state.username,
          status: this.props.user[0].isUser ? "Rider" :"Driver",
          phonenumber: this.state.phonenumber,
          city: this.state.city,
          bio: this.state.bio,
          pic: this.state.url,
          twitter: this.state.twitter,
          facebook: this.state.facebook,
          linkedin: this.state.linkedin,
          youtube: this.state.youtube,
          instagram: this.state.instagram
        }
        console.log("profiledata", profileData)
        this.props.createProfile( profileData, this.props.history )
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }
      imageChangeHandler = (e) => {
        console.log('image', e.target.files[0])
        this.setState({
          image: e.target.files[0]
        })
      }
    render() {
        const { errors, displaySocialInputs} = this.state;
        console.log("profile", this.props.user[0]._id)

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
              //  const options = [
              //    {
              //      label: "* Select Professional Status",
              //      value: 0
              //    },
              //    { label: "Rider", value: "Rider" },
              //    {
              //      label: "Driver",
              //      value: "Driver"
              //    }
              //  ];
               return (
                //  <DashboardSidebar>
                   <div className="create-profile">
                   <div className="container">
                     <div className="row">
                       <div className="col-md-8 m-auto">
                         <h1 className="display-4 text-center">
                           Create Profile
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
                            <div className="file-field input-field">
                            <div className="btn #64b5f6 blue darken-1">
                                <span>Upload Pic</span>
                                <input 
                                    type="file"
                                    name="image"
                                    onChange={this.imageChangeHandler}
                                />
                            </div>
                            {/* <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div> */}
                        </div>

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
                //  </DashboardSidebar>
                 
               );
             }
}

CreateProfile.propTypes = {
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    user: state.user
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
// export default connect()(CreateProfile);
