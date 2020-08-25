import axios from 'axios'
import { connect } from 'react-redux';

// GET current profile
export const getCurrentProfile = (id) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/${id}`)
     .then(res =>{
        dispatch({
            type: "GET_PROFILE",
            payload: res.data
        })})
        .catch(err =>
            dispatch({
                type: "GET_PROFILE",
                payload: {}
            })) 
}


// Get All Profiles
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/allprofiles')
     .then(res => {
         console.log('r',res)
        dispatch({
            type: "GET_PROFILES",
            payload: res.data
          })
     })
     .catch(err => {
         console.log('err', err)
        dispatch({
            type: "GET_PROFILES",
            payload: null
          })
     })
  }


// Create Profile
export const createProfile = ( profileData, history ) => dispatch => {
    axios.post('/api/profile', profileData)
     .then(res => {
         history.push('/myaccount')
        // console.log(res)
        })
     .catch(err => 
        dispatch({
            type: "GET_ERRORS",
            payload: err.response.data
        }))
}

// Profile Loading 
export const setProfileLoading = () => {
    return {
        type: "PROFILE_LOADING"
    }
}