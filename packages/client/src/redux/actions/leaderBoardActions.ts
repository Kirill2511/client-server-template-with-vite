import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddLeader, addToLeaderBoard, getLeaderBoard, GetLeaders } from '../../utils/backEndApi';
import { RootState } from '../store';

export const setLeaderBoard = createAsyncThunk(
  'leaders',
  async (data: GetLeaders, thunkAPI) => {
    try {
      const res = await getLeaderBoard(data);
      return thunkAPI.fulfillWithValue({ ...res });
    } catch (error) {
      if ((error as Record<string, string>).reason?.includes('not valid')) {
        return thunkAPI.rejectWithValue('unauthorized');
      }
      return thunkAPI.rejectWithValue(error);
    }
  },
  {
    condition: (data, { getState, extra }) => {
      const { leaders } = getState() as RootState;
      const date = leaders.date;
      const now = Date.now();
      if (date && date - now < 100000) {
        return false;
      }
    },
  },
);

export const sendResultsToLeaderBoard = createAsyncThunk('leaders', async (data: AddLeader, thunkAPI) => {
  try {
    const res = await addToLeaderBoard(data);
    thunkAPI.fulfillWithValue(res);
  } catch (error) {
    if ((error as Record<string, string>).reason?.includes('not valid')) {
      return thunkAPI.rejectWithValue('unauthorized');
    }
    return thunkAPI.rejectWithValue(error);
  }
});
