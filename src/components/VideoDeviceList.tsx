import { MenuItem, Select } from '@mui/material';
import  { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reducAppHooks';
import useMediaStreamTrack from '../hooks/useMediaStreamTrack';
import { getAllDevices, getDevices } from '../store/slices/devicesSclice';
import {
  getVideoTrack,
  restartVideoTracks,
} from '../store/slices/localTrackSlice';
import { SELECTED_VIDEO_INPUT_KEY } from '../utils/constants';

type Props = {};

const VideoDeviceList = (props: Props) => {
  const { videoInputDevices } = useAppSelector(getAllDevices);
  const localVideoTrack = useAppSelector(getVideoTrack);
  const dispatch = useAppDispatch();

  const [storedLocalVideoDeviceId, setStoredLocalVideoDeviceId] = useState(
    window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY)
  );

  const mediaStreamTrack = useMediaStreamTrack(localVideoTrack);

  const localVideoInputDeviceId =
    mediaStreamTrack?.getSettings().deviceId || storedLocalVideoDeviceId;

  function replaceTrack(newDeviceId: string) {
    // Here we store the device ID in the component state. This is so we can re-render this component display
    // to display the name of the selected device when it is changed while the users camera is off.
    setStoredLocalVideoDeviceId(newDeviceId);
    window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, newDeviceId);
    dispatch(restartVideoTracks());
  }

  useEffect(() => {
    dispatch(getDevices);
  }, []);

  return (
    <Select
      onChange={(e) => replaceTrack(e.target.value as string)}
      value={localVideoInputDeviceId || ''}
      variant="outlined"
      fullWidth
    >
      {videoInputDevices.map((device) => (
        <MenuItem value={device.deviceId} key={device.deviceId}>
          {device.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default VideoDeviceList;
