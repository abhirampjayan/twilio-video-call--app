import { MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reducAppHooks';
import useMediaStreamTrack from '../hooks/useMediaStreamTrack';
import { getAllDevices, getDevices } from '../store/slices/devicesSclice';
import {
  getAudioTrack,
  restartVideoTracks,
} from '../store/slices/localTrackSlice';
import { SELECTED_AUDIO_INPUT_KEY, SELECTED_VIDEO_INPUT_KEY } from '../utils/constants';

type Props = {};

const AudioInputDeviceList = (props: Props) => {
  const { audioInputDevices } = useAppSelector(getAllDevices);
  const localAudioTrack = useAppSelector(getAudioTrack);
  const dispatch = useAppDispatch();

  const [storedLocalAudioDeviceId, setStoredLocalAudioDeviceId] = useState(
    window.localStorage.getItem(SELECTED_AUDIO_INPUT_KEY)
  );

  const mediaStreamTrack = useMediaStreamTrack(localAudioTrack);

  const localAudioInputDeviceId =
    mediaStreamTrack?.getSettings().deviceId || storedLocalAudioDeviceId;

  function replaceTrack(newDeviceId: string) {
    // Here we store the device ID in the component state. This is so we can re-render this component display
    // to display the name of the selected device when it is changed while the users camera is off.
    setStoredLocalAudioDeviceId(newDeviceId);
    window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, newDeviceId);
    dispatch(restartVideoTracks);
  }

  useEffect(() => {
    dispatch(getDevices);
  }, []);

  return (
    <Select
      onChange={(e) => replaceTrack(e.target.value as string)}
      value={localAudioInputDeviceId || ''}
      variant="outlined"
      fullWidth
    >
      {audioInputDevices.map((device) => (
        <MenuItem value={device.deviceId} key={device.deviceId}>
          {device.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default AudioInputDeviceList;
