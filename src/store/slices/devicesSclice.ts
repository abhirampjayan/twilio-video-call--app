import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';
import { RemoteParticipant, RemoteTrack } from 'twilio-video';
import { getDeviceInfo } from '../../utils/getDeviceInfo';

const initialState: {
  audioInputDevices: MediaDeviceInfo[];
  videoInputDevices: MediaDeviceInfo[];
  audioOutputDevices: MediaDeviceInfo[];
  hasAudioInputDevices: boolean;
  hasVideoInputDevices: boolean;
} = {
  audioInputDevices: [],
  videoInputDevices: [],
  audioOutputDevices: [],
  hasAudioInputDevices: false,
  hasVideoInputDevices: false,
};

export const devicesSclice = createSlice({
  name: 'remoteTrack',
  initialState,
  reducers: {
    getDevices: (state) => {
      getDeviceInfo().then((devices) => {
        state = devices;
      });
    },
  },
});

export const getRemoteTracks = (state: RootState) => state.remoteTracks.tracks;

export const { getDevices } = devicesSclice.actions;

export default devicesSclice.reducer;
