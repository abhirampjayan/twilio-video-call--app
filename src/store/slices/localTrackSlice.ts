import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs/promises';
import { Root } from 'react-dom/client';
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
  audioTrack: LocalAudioTrack | undefined;
  videoTrack: LocalVideoTrack | undefined;
  isAcquiringLocalTracks: boolean;
}

const initialState: LocalTrackSlice = {
  audioTrack: undefined,
  videoTrack: undefined,
  isAcquiringLocalTracks: false,
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
    removeLocalAudioTrack: (state) => {
      if (state.audioTrack) {
        state.audioTrack.stop();
        state.audioTrack = undefined;
      }
    },
    removeLocalVideoTrack: (state) => {
      if (state.videoTrack) {
        state.videoTrack.stop();
        state.videoTrack = undefined;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocalVideoTrack.pending, (state) => {
        state.isAcquiringLocalTracks = true;
      })
      .addCase(getLocalVideoTrack.fulfilled, (state, action) => {
        state.videoTrack = action.payload;
      });
  },
});

export const { removeLocalAudioTrack, removeLocalVideoTrack } =
  localTrackSlice.actions;

export const getVideoTrack = (state: RootState) => state.localTrack.videoTrack;
export const getAudioTrack = (state: RootState) => state.localTrack.audioTrack;
export const getLocalTracks = (state: RootState) =>
  [state.localTrack.videoTrack, state.localTrack.audioTrack].filter(
    (track) => track !== undefined
  ) as (LocalAudioTrack | LocalVideoTrack)[];

export default localTrackSlice.reducer;
