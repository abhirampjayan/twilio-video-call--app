import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reducAppHooks';
import { connectToRoom, getRoomStatus } from '../store/slices/roomSlice';

const JoiningScreen = () => {
  const [roomName, setRoomName] = useState('');
  const dispatch = useAppDispatch();
  const status = useAppSelector(getRoomStatus);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (roomName.trim().length) {
      dispatch(connectToRoom(roomName));
    }
  };

  return (
    <Box
      component={Container}
      alignItems="center"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
    >
      <Card variant="outlined" component={'form'} onSubmit={handleSubmit}>
        <Box py={4} px={4} bgcolor="secondary" minWidth={'320px'}>
          <CardContent sx={{ padding: 0 }}>
            <Typography variant="h4" color={'primary'} align="center">
              Join to a room
            </Typography>
            <Box py={4}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" width="100%">
              <Button
                variant="contained"
                size="large"
                disableElevation
                type="submit"
                color={'primary'}
                fullWidth
              >
                {status === 'connecting' ? <CircularProgress color='inherit'/> : 'Join Room'}
              </Button>
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default JoiningScreen;
