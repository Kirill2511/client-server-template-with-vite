import { createAsyncThunk } from '@reduxjs/toolkit';

import { setAvatarRequest, setProfileInfoRequest, setProfilePasswordRequest } from '../../utils/api';

interface IChangeInfo {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  display_name: string;
}

interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export const setAvatar = createAsyncThunk('auth/user/avatar', async (data: FormData, thunkAPI) => {
  try {
    const res = await setAvatarRequest(data);
    const user = await res.json();
    return res.ok ? thunkAPI.fulfillWithValue({ ...user }) : thunkAPI.rejectWithValue('Не удалось загрузить аватар');
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить аватар');
  }
});

export const setProfileInfo = createAsyncThunk('auth/user', async (data: IChangeInfo, thunkAPI) => {
  try {
    const res = await setProfileInfoRequest(data);
    const user = await res.json();
    return res.ok ? thunkAPI.fulfillWithValue({ ...user }) : thunkAPI.rejectWithValue('Не удалось обновить данные');
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось обновить данные');
  }
});

export const setProfilePassword = createAsyncThunk('auth/user/password', async (data: IChangePassword, thunkAPI) => {
  try {
    const res = await setProfilePasswordRequest(data);
    return res.ok ? thunkAPI.fulfillWithValue({}) : thunkAPI.rejectWithValue('Не удалось обновить пароль');
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось обновить данные');
  }
});
