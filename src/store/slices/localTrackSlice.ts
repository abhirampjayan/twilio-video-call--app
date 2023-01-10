import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  CreateLocalTrackOptions,
  createLocalTracks,
  createLocalVideoTrack,
  LocalAudioTrack,
  LocalTrack,
  LocalVideoTrack,
} from 'twilio-video';

import {
  DEFAULT_VIDEO_CONSTRAINTS,
  SELECTED_AUDIO_INPUT_KEY,
  SELECTED_VIDEO_INPUT_KEY,
} from '../../utils/constants';
import { getDeviceInfo } from '../../utils/getDeviceInfo';
import { isPermissionDenied } from '../../utils/isPermissionDenied';
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

export const getAudioAndVideoTracks = createAsyncThunk(
  'localTrack/getAudioAndVideoTracks',
  async (state: LocalTrackSlice) => {
    const {
      audioInputDevices,
      videoInputDevices,
      hasAudioInputDevices,
      hasVideoInputDevices,
    } = await getDeviceInfo();

    if (!hasAudioInputDevices && !hasVideoInputDevices)
      return Promise.resolve();
    if (state.status === 'acquiring' || state.audioTrack || state.videoTrack)
      return Promise.resolve();

    const selectedAudioDeviceId = window.localStorage.getItem(
      SELECTED_AUDIO_INPUT_KEY
    );
    const selectedVideoDeviceId = window.localStorage.getItem(
      SELECTED_VIDEO_INPUT_KEY
    );

    const hasSelectedAudioDevice = audioInputDevices.some(
      (device) =>
        selectedAudioDeviceId && device.deviceId === selectedAudioDeviceId
    );
    const hasSelectedVideoDevice = videoInputDevices.some(
      (device) =>
        selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId
    );

    const isCameraPermissionDenied = await isPermissionDenied('camera');
    const isMicrophonePermissionDenied = await isPermissionDenied('microphone');

    const shouldAcquireVideo =
      hasVideoInputDevices && !isCameraPermissionDenied;
    const shouldAcquireAudio =
      hasAudioInputDevices && !isMicrophonePermissionDenied;

    const localTrackConstraints = {
      video: shouldAcquireVideo && {
        ...(DEFAULT_VIDEO_CONSTRAINTS as {}),
        name: `camera-${Date.now()}`,
        ...(hasSelectedVideoDevice && {
          deviceId: { exact: selectedVideoDeviceId! },
        }),
      },
      audio: shouldAcquireAudio && {
        ...(hasSelectedAudioDevice && {
          deviceId: { exact: selectedAudioDeviceId! },
        }),
      },
    };
    return createLocalTracks(localTrackConstraints).then((tracks) => {
      return tracks;
    });
  }
);

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
        if (state.videoTrack) state.videoTrack.stop();
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
      })
      .addCase(getAudioAndVideoTracks.fulfilled, (state, action) => {
        const track = action.payload as LocalTrack[];
        const newVideoTrack = track.find(
          (track) => track.kind === 'video'
        ) as LocalVideoTrack;
        const newAudioTrack = track.find(
          (track) => track.kind === 'audio'
        ) as LocalAudioTrack;

        if (newVideoTrack) {
          state.videoTrack = newVideoTrack;
          // Save the deviceId so it can be picked up by the VideoInputList component. This only matters
          // in cases where the user's video is disabled.
          // window.localStorage.setItem(
          //   SELECTED_VIDEO_INPUT_KEY,
          //   newVideoTrack.mediaStreamTrack.getSettings().deviceId ?? ''
          // );
        }
        if (newAudioTrack) {
          state.audioTrack = newAudioTrack;
        }
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
