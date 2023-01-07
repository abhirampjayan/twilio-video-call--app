import { InitialEntry } from './../../../node_modules/@remix-run/router/history';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Room } from 'twilio-video';

interface InitialState {
  room: Room | null;
}
const initialState: InitialState = {
  room: null,
};

const connectToRoom = createAsyncThunk('room/Connect', async (InitialEntry) => {});

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = roomSlice.actions;
export default roomSlice.reducer;
