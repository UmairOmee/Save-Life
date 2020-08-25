import React from 'react';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import { bookingRequest } from '../../actions/bookingActions'
import DashboardSidebar from './dashboardSidebar'
// import PropTypes from 'prop-types';

class Booking extends React.Component{
    state = {
        phonenumber: '',
        address: '',
        time: '',
        date: '',
        description: ''
      };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

    onSubmit = (e) => {
      e.preventDefault();

      const booking = {
        id: this.props.user[0]._id,
        phonenumber: this.state.phonenumber,
        address: this.state.address,
        time: this.state.time,
        date: this.state.date,
        description: this.state.description
      }
      this.props.dispatch(bookingRequest(booking, this.props.history));
    }
    render(){
        return(
          <DashboardSidebar>
            <div>
                <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Ambulance Booking</h1>
              <p className="lead text-center">
                Ambulance Booking Details
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Phonenumber"
                  name="phonenumber"
                  value={this.state.phonenumber}
                  onChange={this.onChange}
                //   error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                //   error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Time"
                  name="time"
                  type="time"
                  value={this.state.time}
                  onChange={this.onChange}
                //   error={errors.fieldofstudy}
                />
                <h6>Date</h6>
                <TextFieldGroup
                  name="date"
                  type="date"
                  value={this.state.date}
                  onChange={this.onChange}
                //   error={errors.from}
                />
                <TextAreaFieldGroup
                  placeholder="Booking Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                //   error={errors.description}
                  info="Tell us Booking description"
                />
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
            </div>
            </DashboardSidebar>
        );
    }

}

const mapstateToProps = (store) => ({
    user: store.user
})

export default connect(mapstateToProps)(Booking);