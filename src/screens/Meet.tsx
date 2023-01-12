import {
  Mic,
  MicOff,
  Settings,
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
import { RemoteParticipant } from 'twilio-video';
import { ParticipantAudioTracks } from '../components/ParticipantAudioTracks';
import ParticipantsVideoTracks from '../components/ParticipantsVideoTracks';
import VideoTrack from '../components/VideoTrack';

import { useAppDispatch, useAppSelector } from '../hooks/reducAppHooks';
import {
  getAudioMute,
  getLocalTracks,
  getVideoMute,
  toggleAudioTrack,
  toggleVideoTrack,
} from '../store/slices/localTrackSlice';
import {
  addParticipant,
  removeParticipant,
} from '../store/slices/participantsSclice';
import { getRoom } from '../store/slices/roomSlice';

const Meet = () => {
  const room = useAppSelector(getRoom);
  const dispatch = useAppDispatch();
  const audioMute = useAppSelector(getAudioMute);
  const videoMute = useAppSelector(getVideoMute);

  return (
    <>
      <Box
        sx={{ background: 'red' }}
        display="flex"
        height="100vh"
        width="100vw"
        padding={10}
      >
        <ParticipantsVideoTracks  />
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
          </Box>
          <Box>
            <IconButton>
              <Settings />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Meet;
