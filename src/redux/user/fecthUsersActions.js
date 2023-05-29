const { configureStore } = require('@reduxjs/toolkit');
const axios = require('axios');
require('dotenv').config();

const {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} = require('./fetchUsersTypes');

function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUEST,
  };
}

function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
}

function fetchUsersFailure(error) {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
}

function fetchUsers() {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios
      .get(`http://localhost:${process.env.PORT}/api/users`)
      .then(response => {
        const users = response.data.map(user => {
          return {
            id: user._id,
            email: user.email,
            password: user.password,
          };
        });
        dispatch(fetchUsersSuccess(users));
      })
      .catch(error => dispatch(fetchUsersFailure(error)));
  };
}

module.exports = fetchUsers;
