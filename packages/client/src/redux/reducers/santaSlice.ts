import { createSlice } from '@reduxjs/toolkit';
interface ISantaSlice {
  santaGameStarted: boolean;
}

const santaInitState: ISantaSlice = {
  santaGameStarted: false,
};
export const santaSlice = createSlice({
  name: 'santa',
  initialState: santaInitState,
  reducers: {
    setSantaGameIsStarted: (state) => {
      state.santaGameStarted = !state.santaGameStarted;
    },
  },
});
export const { setSantaGameIsStarted } = santaSlice.actions;
