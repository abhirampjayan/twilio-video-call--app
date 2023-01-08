import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './slices/roomSlice';
import localTrackReducer from './slices/localTrackSlice';

export const store = configureStore({
  reducer: {
    room: roomReducer,
    localTrack: localTrackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
