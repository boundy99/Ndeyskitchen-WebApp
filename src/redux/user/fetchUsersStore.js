const { configureStore } = require('@reduxjs/toolkit');
const thunkMiddleware = require('redux-thunk').default;

const userReducer = require('./fetchUsersReducer');
const fetchUsers = require('./fecthUsersActions');

const usersStore = configureStore({
  reducer: userReducer,
  middleware: [thunkMiddleware],
});

usersStore.subscribe(() => {
  console.log(usersStore.getState());
});
usersStore.dispatch(fetchUsers());
