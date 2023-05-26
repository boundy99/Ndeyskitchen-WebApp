const { configureStore } = require('@reduxjs/toolkit');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
require('dotenv').config();

const initialState = {
  loading: false,
  users: [],
  error: '',
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: '',
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

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
      .catch(error => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
}

const store = configureStore({
  reducer: reducer,
  middleware: [thunkMiddleware],
});

store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
