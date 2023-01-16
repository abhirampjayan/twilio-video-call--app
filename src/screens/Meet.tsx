import {
  DoorFront,
  Mic,
  MicOff,
  Settings,
  Unpublished,
  Videocam,
  VideocamOff,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import DeviceSelectionModel from '../components/DeviceSelectionModel';
import { ParticipantAudioTracks } from '../components/ParticipantAudioTracks';
import ParticipantsVideoTracks from '../components/ParticipantsVideoTracks';

import { useAppDispatch, useAppSelector } from '../hooks/reducAppHooks';
import {
  getAudioMute,
  getVideoMute,
  toggleAudioTrack,
  toggleVideoTrack,
} from '../store/slices/localTrackSlice';
import { disconnectRoom, getRoom } from '../store/slices/roomSlice';

const Meet = () => {
  const room = useAppSelector(getRoom);
  const dispatch = useAppDispatch();
  const audioMute = useAppSelector(getAudioMute);
  const videoMute = useAppSelector(getVideoMute);

  return (
    <>
      <Box display="grid" height="100vh" width="100vw" padding={10}>
        <ParticipantsVideoTracks />
      </Box>
      <ParticipantAudioTracks />
      <Box
        component={AppBar}
        position="fixed"
        display="flex"
        py={1}
        alignItems="center"
        justifyContent="center"
        bottom={0}
        top="auto"
      >
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          bgcolor={'secondary'}
          justifyContent="space-between"
          component={Container}
        >
          <Typography>{room?.name}</Typography>
          <Box
            display={'flex'}
            gap={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              disableElevation
              color="error"
              sx={{ minWidth: '150px' }}
              onClick={() => dispatch(toggleAudioTrack())}
              startIcon={audioMute ? <MicOff /> : <Mic />}
            >
              {audioMute ? 'unmute' : 'mute'}
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{ minWidth: '150px' }}
              disableElevation
              startIcon={videoMute ? <VideocamOff /> : <Videocam />}
              color="error"
              onClick={() => dispatch(toggleVideoTrack())}
            >
              {videoMute ? 'cam on' : 'cam off'}
            </Button>
            <DeviceSelectionModel />
          </Box>
          <Button
            variant="contained"
            size="large"
            disableElevation
            color="error"
            sx={{ minWidth: '150px' }}
            onClick={() => dispatch(disconnectRoom())}
            startIcon={<DoorFront />}
          >
            Disconnect
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Meet;
