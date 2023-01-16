import { MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reducAppHooks';
import useMediaStreamTrack from '../hooks/useMediaStreamTrack';
import { getAllDevices, getDevices } from '../store/slices/devicesSclice';
import { getAudioTrack } from '../store/slices/localTrackSlice';
import { SELECTED_AUDIO_INPUT_KEY } from '../utils/constants';

const AudioInputDeviceList = () => {
  const dispatch = useAppDispatch();
  const { audioInputDevices } = useAppSelector(getAllDevices);
  const localAudioTrack = useAppSelector(getAudioTrack);

  const mediaStreamTrack = useMediaStreamTrack(localAudioTrack);

  const localAudioInputDeviceId = mediaStreamTrack?.getSettings().deviceId;

  function replaceTrack(newDeviceId: string) {
    window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, newDeviceId);
    localAudioTrack?.restart({ deviceId: { exact: newDeviceId } });
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
