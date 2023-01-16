import { Settings } from '@mui/icons-material';
import { IconButton, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/reducAppHooks';
import { getDevices } from '../store/slices/devicesSclice';
import AudioInputDeviceList from './AudioInputDeviceList';
import VideoDeviceList from './VideoDeviceList';

type Props = {};

const DeviceSelectionModel = (props: Props) => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDeviceChange = useCallback(() => {
    dispatch(getDevices());
  }, []);

  useEffect(() => {
    handleDeviceChange();
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    getDevices();
    return () => {
      navigator.mediaDevices.removeEventListener(
        'devicechange',
        handleDeviceChange
      );
    };
  }, []);
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Settings />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box
          p={4}
          m="auto"
          position="absolute"
          left="50%"
          top="50%"
          sx={{
            backgroundColor: 'white',
            maxWidth: '520px',
            border: '2px solid #000',
            boxShadow: 24,
            margin: 'auto',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Audio & Video Devices
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Video Input Devices
          </Typography>
          <VideoDeviceList />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Audio Input Devices
          </Typography>
          <AudioInputDeviceList />
        </Box>
      </Modal>
    </>
  );
};

export default DeviceSelectionModel;
