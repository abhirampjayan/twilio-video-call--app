import { RootState } from '../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDeviceInfo } from '../../utils/getDeviceInfo';

interface InitialState {
  audioInputDevices: MediaDeviceInfo[];
  videoInputDevices: MediaDeviceInfo[];
  audioOutputDevices: MediaDeviceInfo[];
  hasAudioInputDevices: boolean;
  hasVideoInputDevices: boolean;
}

const initialState: InitialState = {
  audioInputDevices: [],
  videoInputDevices: [],
  audioOutputDevices: [],
  hasAudioInputDevices: false,
  hasVideoInputDevices: false,
};

export const getDevices = createAsyncThunk('devices/getDevices', async () => {
  const devices = await getDeviceInfo();
  return devices;
});

export const devicesSclice = createSlice({
  name: 'remoteTrack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDevices.fulfilled, (state, action) => {
      const devices = action.payload;
      state.videoInputDevices = devices.videoInputDevices;
      state.audioInputDevices = devices.audioInputDevices;
      state.audioOutputDevices = devices.audioOutputDevices;
      state.hasAudioInputDevices = devices.hasAudioInputDevices;
      state.hasVideoInputDevices = devices.hasVideoInputDevices;
    });
  },
});

export const getAllDevices = (state: RootState) => state.devices;

export const {} = devicesSclice.actions;

export default devicesSclice.reducer;
