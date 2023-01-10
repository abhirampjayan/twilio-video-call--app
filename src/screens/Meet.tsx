import { Mic, Settings, Videocam } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import VideoTrack from '../components/VideoTrack';

import { useAppSelector } from '../hooks/reducAppHooks';
import { getRoom } from '../store/slices/roomSlice';

const Meet = () => {
  const room = useAppSelector(getRoom);
  useEffect(() => {
    if (room)
      room.on('participantConnected', (participant) => {
        console.log(`Participant "${participant.identity}" connected`);

        participant.tracks.forEach((publication) => {
          if (publication.isSubscribed) {
            const track = publication.track;
          }
        });

        participant.on('trackSubscribed', (track) => {});
      });

    return () => {};
  }, []);

  return (
    <>
      <VideoTrack track={null} />
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
          <Box display="flex" gap={2}>
            <Button variant="contained" disableElevation color="error">
              <Mic />
            </Button>
            <Button variant="contained" disableElevation color="error">
              <Videocam />
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
