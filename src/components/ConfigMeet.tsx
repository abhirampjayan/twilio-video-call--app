import {
  Mic,
  MicOff,
  Videocam,
  VideoCameraFront,
  VideocamOff,
} from '@mui/icons-material';
import { Avatar, Box, Button, Card, Grid, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { LocalAudioTrack, LocalVideoTrack } from 'twilio-video';
import { useAppDispatch, useAppSelector } from '../hooks/reducAppHooks';
import {
  getAudioMute,
  getLocalTracks,
  getLocalVideoTrack,
  removeLocalVideoTrack,
  getTrackStatus,
  getVideoMute,
  toggleAudioTrack,
  toggleVideoTrack,
} from '../store/slices/localTrackSlice';
import { connectToRoom } from '../store/slices/roomSlice';
import VideoTrack from './VideoTrack';
// import { connectToRoom, getRoomStatus } from '../store/slices/roomSlice';

type Props = {
  roomName: string;
  participantName: string;
};

const ConfigMeet = ({ roomName, participantName }: Props) => {
  const dispatch = useAppDispatch();
  const localTracks = useAppSelector(getLocalTracks);
  const audioMute = useAppSelector(getAudioMute);
  const videoMute = useAppSelector(getVideoMute);
  const status = useAppSelector(getTrackStatus);

  const videoTrack = localTracks.find(
    (track: LocalVideoTrack | LocalAudioTrack) => track.kind === 'video'
  ) as LocalVideoTrack;
  const handleConnection = () => {
    dispatch(
      connectToRoom({
        room: roomName,
        name: participantName,
        tracks: localTracks,
      })
    );
  };
  useEffect(() => {
    if (!videoMute) dispatch(getLocalVideoTrack());
    else dispatch(removeLocalVideoTrack());
    return () => {};
  }, [videoMute]);

  useEffect(() => {
    if (videoTrack) {
      videoTrack.on('disabled', () => {
        alert('hello');
      });
    }
    return () => {};
  }, [videoTrack]);

  const handleSubmit = () => {};
  return (
    <Box
      alignItems="center"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      bgcolor="grey.100"
    >
      <Box
        variant="outlined"
        component={Card}
        width="fit-content"
        minWidth={'320px'}
        mx={10}
      >
        <Box
          py={4}
          px={4}
          component={'form'}
          onSubmit={handleSubmit}
          bgcolor="secondary"
        >
          <Grid gap={5}>
            <Grid item display="flex" alignItems="center" gap={1}>
              <VideoCameraFront color="primary" fontSize="large" />
              <Typography color="secondary" variant="h5" fontWeight="500">
                {roomName}
              </Typography>
            </Grid>
            <Grid item>
              <Box display={'flex'} height="320px" width="640px" pt={4} pb={3}>
                {videoTrack ? (
                  <VideoTrack track={videoTrack} />
                ) : (
                  <Box
                    bgcolor={'grey.500'}
                    display="flex"
                    width={'100%'}
                    height={'100%'}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item>
              <Typography align="center">{participantName}</Typography>
            </Grid>
            <Grid item justifyContent="center" alignItems="center">
              <Box pt={3} display={'flex'} gap={2} justifyContent="center">
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
              <Box pt={3} display={'flex'} gap={2} justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  sx={{ minWidth: '150px', color: 'white' }}
                  disableElevation
                  onClick={handleConnection}
                >
                  Connect
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfigMeet;
