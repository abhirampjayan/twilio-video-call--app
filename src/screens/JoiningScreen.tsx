import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { FormEvent, useState } from 'react';
import ConfigMeet from '../components/ConfigMeet';

enum PageState {
  RoomDetails,
  DeviceConfig,
}

const JoiningScreen = () => {
  const [roomName, setRoomName] = useState('');
  const [currentScreen, setCurrentScreen] = useState(PageState.RoomDetails);
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (roomName.trim().length && name.trim().length) {
      setCurrentScreen(PageState.DeviceConfig);
    }
  };
  const handleRoomChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setRoomName(e.target.value);

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setName(e.target.value);

  return false ? (
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
          <CardContent sx={{ padding: 0 }}>
            <Typography variant="h4" color={'secondary'} align="center">
              Join to a room
            </Typography>
            <Box pt={4}>
              <TextField
                fullWidth
                placeholder="Your Name"
                value={name}
                onChange={handleNameChange}
                required
                sx={{ background: grey[100] }}
                inputProps={{ style: { border: 'none' }, border: 'none' }}
              />
            </Box>
            <Box py={4}>
              <TextField
                fullWidth
                placeholder="Room Name"
                value={roomName}
                onChange={handleRoomChange}
                required
                sx={{ background: grey[100] }}
                inputProps={{ style: { border: 'none' }, border: 'none' }}
              />
            </Box>
          </CardContent>
          <CardActions sx={{ padding: 0 }}>
            <Box display="flex" justifyContent="center" width="100%">
              <Button
                variant="contained"
                size="large"
                disableElevation
                type="submit"
                color={'primary'}
                sx={{ padding: '12px 12px', margin: 0 }}
                fullWidth
              >
                {status === 'connecting' ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <Typography fontWeight={600} color="grey.100">
                    Ready to Join
                  </Typography>
                )}
              </Button>
            </Box>
          </CardActions>
        </Box>
      </Box>
    </Box>
  ) : (
    <ConfigMeet participantName={name} roomName={roomName} />
  );
};

export default JoiningScreen;
