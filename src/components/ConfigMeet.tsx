import { Mic, Videocam, VideoCameraFront } from '@mui/icons-material';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { LocalVideoTrack } from 'twilio-video';
import { useAppDispatch, useAppSelector } from '../hooks/reducAppHooks';
import {
  getLocalTracks,
  getLocalVideoTrack,
} from '../store/slices/localTrackSlice';
// import { connectToRoom, getRoomStatus } from '../store/slices/roomSlice';
import VideoTrack from './VideoTrack';

type Props = {
  roomName: string;
  participantName: string;
};

const ConfigMeet = (props: Props) => {
  const dispatch = useAppDispatch();
  const localTracks = useAppSelector(getLocalTracks);
  

  useEffect(() => {
    getLocalVideoTrack();
    return () => {};
  }, []);

  const videoTrack = localTracks.find(
    (track) => track.kind === 'video'
  ) as LocalVideoTrack;

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
        width="100%"
        maxWidth="500px"
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
              <Typography color="secondary" fontWeight="500">
                Room Name
              </Typography>
            </Grid>
            <Grid item>
              <Box display={'flex'} height="320px" width="640px">
                <VideoTrack track={videoTrack} />
              </Box>
            </Grid>
            <Grid item>
              <Typography align="center">User Name</Typography>
            </Grid>
            <Grid item>
              <Box pt={3} display={'flex'} gap={2} justifyContent="center">
                <Button variant="contained" disableElevation color="error">
                  <Mic />
                </Button>
                <Button variant="contained" disableElevation color="error">
                  <Videocam />
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
