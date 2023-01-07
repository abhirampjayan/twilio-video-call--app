import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Typography,
} from '@mui/material';

import { useState } from 'react';

const JoiningScreen = () => {
    const [roomName, setRoomName] = useState('');
  return (
    <Box
      component={Container}
      alignItems="center"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
    >
      <Card variant="outlined" component={'form'}>
        <Box py={4} px={4} bgcolor="secondary" minWidth={'320px'}>
          <CardContent sx={{ padding: 0 }}>
            <Typography variant="h4" color={'primary'} align="center">
              Joint to a room
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
                color={'primary'}
                onClick={() => {
                  setRoomName('Room Name');
                }}
              >
                Set Room Name
              </Button>
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default JoiningScreen;
