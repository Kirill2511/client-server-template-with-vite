import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, checkLogin } from '../actions/singActions';

interface IUserSlice {
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: {};
  isAuthorized: boolean;
  isFetching: boolean;
  fetchingFailed: boolean;
  error: string | null;
}

const initialState: IUserSlice = {
  user: {},
  isAuthorized: false,
  isFetching: false,
  fetchingFailed: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled.type]: (state, action) => {
      state.fetchingFailed = false;
      state.isAuthorized = true;
      state.user = action.payload;
      state.isFetching = false;
    },
    [register.pending.type]: (state) => {
      state.fetchingFailed = true;
      state.isAuthorized = false;
      state.isFetching = true;
    },
    [register.rejected.type]: (state) => {
      state.fetchingFailed = true;
      state.isAuthorized = false;
      state.isFetching = false;
    },
    [login.fulfilled.type]: (state) => {
      state.fetchingFailed = false;
      state.isAuthorized = true;
      state.user = {};
      state.isFetching = false;
    },
    [login.pending.type]: (state) => {
      state.fetchingFailed = true;
      state.isAuthorized = false;
      state.isFetching = true;
    },
    [login.rejected.type]: (state) => {
      state.fetchingFailed = true;
      state.isAuthorized = false;
      state.isFetching = false;
    },
    [checkLogin.fulfilled.type]: (state, action) => {
      console.log(1);

      state.fetchingFailed = false;
      state.isAuthorized = !!action.payload.id;
      state.user = action.payload;
      state.isFetching = false;
    },
    [checkLogin.pending.type]: (state) => {
      state.fetchingFailed = true;
      state.isAuthorized = false;
      state.isFetching = true;
    },
    [checkLogin.rejected.type]: (state) => {
      state.fetchingFailed = true;
      state.isAuthorized = false;
      state.isFetching = false;
    },
    [logout.fulfilled.type]: (state) => {
      state.isAuthorized = false;
      state.user = '';
    },
  },
});
