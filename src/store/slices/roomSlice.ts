import { TwilioError } from './../../../node_modules/twilio-video/tsdef/TwilioError.d';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  connect,
  LocalAudioTrack,
  LocalTrack,
  Room,
  LocalVideoTrack,
} from 'twilio-video';
import { VIDEO_TOKEN } from '../../config';
import { RootState } from '../store';
import axios from 'axios';
import {store as rootStore} from '../store'

interface InitialState {
  room: Room | null;
  error: string | null;
  status: 'successful' | 'failed' | 'connecting' | 'idle';
}
const initialState: InitialState = {
  room: null,
  status: 'idle',
  error: null,
};

export const connectToRoom = createAsyncThunk(
  'room/Connect',
  async ({
    room,
    name,
    tracks,
  }: {
    room: string;
    name: string;
    tracks: (LocalAudioTrack | LocalVideoTrack)[];
  }) => {
    const result = await axios.post(
      'https://video-call-4161-dev.twil.io/video-token',
      { identity: name, room }
    );
    const data = await connect(result.data, { name: room, tracks });
    console.log('data', data);
    return data;
  }
);

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectToRoom.pending, (state) => {
        state.status = 'connecting';
      })
      .addCase(connectToRoom.fulfilled, (state, action) => {
        state.status = 'successful';
        state.room = action.payload as unknown as Room;
        state.room.participants.forEach((participant) => {
          // [...state.participants, action.payload];
        });
      })
      .addCase(connectToRoom.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error as unknown as TwilioError).message;
      });
  },
});

export const {} = roomSlice.actions;
export default roomSlice.reducer;

export const getRoom = (state: RootState) => state.room.room;
export const getRoomStatus = (state: RootState) => state.room.status;
export const getRoomError = (state: RootState) => state.room.error;
