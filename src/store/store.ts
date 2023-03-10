import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './slices/roomSlice';
import localTrackReducer from './slices/localTrackSlice';
import participantsReducer from './slices/participantsSclice';
import remoteTrackReducer from './slices/remoteTrackSlice';
import devicesReducer from './slices/devicesSclice';

export const store = configureStore({
  reducer: {
    room: roomReducer,
    localTrack: localTrackReducer,
    participants: participantsReducer,
    remoteTracks: remoteTrackReducer,
    devices: devicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
