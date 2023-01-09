import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  CreateLocalTrackOptions,
  createLocalVideoTrack,
  LocalAudioTrack,
  LocalVideoTrack,
} from 'twilio-video';

import {
  DEFAULT_VIDEO_CONSTRAINTS,
  SELECTED_VIDEO_INPUT_KEY,
} from '../../utils/constants';
import { getDeviceInfo } from '../../utils/getDeviceInfo';
import { RootState } from '../store';

interface LocalTrackSlice {
  audioTrack: LocalAudioTrack | null;
  videoTrack: LocalVideoTrack | null;
  muteAudioTrack: boolean;
  muteVideoTrack: boolean;
  status: 'idle' | 'acquiring' | 'success';
}

const initialState: LocalTrackSlice = {
  audioTrack: null,
  videoTrack: null,
  muteAudioTrack: false,
  muteVideoTrack: false,
  status: 'idle',
};

export const getLocalVideoTrack = createAsyncThunk(
  'localTrack/getLocalVideoTrack',
  async () => {
    const selectedVideoDeviceId = window.localStorage.getItem(
      SELECTED_VIDEO_INPUT_KEY
    );

    const { videoInputDevices } = await getDeviceInfo();

    const hasSelectedVideoDevice = videoInputDevices.some(
      (device) =>
        selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId
    );

    const options: CreateLocalTrackOptions = {
      ...(DEFAULT_VIDEO_CONSTRAINTS as {}),
      name: `camera-${Date.now()}`,
      ...(hasSelectedVideoDevice && {
        deviceId: { exact: selectedVideoDeviceId! },
      }),
    };
    return createLocalVideoTrack(options);
  }
);

const localTrackSlice = createSlice({
  name: 'localTrack',
  initialState,
  reducers: {
    toggleAudioTrack: (state) => {
      if (state.muteAudioTrack) {
        state.audioTrack?.enable();
        state.muteAudioTrack = false;
      } else {
        state.audioTrack?.disable();
        state.muteAudioTrack = true;
      }
    },
    toggleVideoTrack: (state) => {
      if (state.muteVideoTrack) {
        state.muteVideoTrack = false;
      } else {
        state.muteVideoTrack = true;
      }
    },
    removeLocalAudioTrack: (state) => {
      if (state.audioTrack) {
        state.audioTrack.stop();
        state.audioTrack = null;
      }
    },
    removeLocalVideoTrack: (state) => {
      if (state.videoTrack) {
        state.videoTrack.stop();
        state.videoTrack = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocalVideoTrack.pending, (state) => {
        state.status = 'acquiring';
      })
      .addCase(getLocalVideoTrack.fulfilled, (state, action) => {
        state.videoTrack = action.payload;
        state.status = 'success';
      });
  },
});

export const {
  removeLocalAudioTrack,
  removeLocalVideoTrack,
  toggleAudioTrack,
  toggleVideoTrack,
} = localTrackSlice.actions;

export const getVideoTrack = (state: RootState) => state.localTrack.videoTrack;
export const getAudioTrack = (state: RootState) => state.localTrack.audioTrack;
export const getTrackStatus = (state: RootState) => state.localTrack.status;
export const getAudioMute = (state: RootState) =>
  state.localTrack.muteAudioTrack;
export const getVideoMute = (state: RootState) =>
  state.localTrack.muteVideoTrack;

export const getLocalTracks = (state: RootState) =>
  [state.localTrack.videoTrack, state.localTrack.audioTrack].filter(
    (track) => track !== null
  ) as (LocalAudioTrack | LocalVideoTrack)[];

export default localTrackSlice.reducer;
