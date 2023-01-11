import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';
import { RemoteParticipant, RemoteTrack } from 'twilio-video';

interface IParticipantsSlice {
  tracks: RemoteTrack[];
}

const initialState: IParticipantsSlice = { tracks: [] };

export const remoteTrackSlice = createSlice({
  name: 'remoteTrack',
  initialState,
  reducers: {
    addTrack: (state, action) => {
      const participant = action.payload as RemoteParticipant;
      const subscribedTracks = Array.from(participant.tracks.values())
        .filter((trackPublication) => trackPublication.track !== null)
        .map((trackPublication) => trackPublication.track!);
      state.tracks = subscribedTracks;
    },
  },
});

export const getRemoteTracks = (state: RootState) => state.remoteTracks.tracks;

export const { addTrack } = remoteTrackSlice.actions;

export default remoteTrackSlice.reducer;
