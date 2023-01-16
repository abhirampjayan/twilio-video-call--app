import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { LocalVideoTrack, RemoteVideoTrack } from 'twilio-video';

type Props = {
  track: LocalVideoTrack | RemoteVideoTrack | null;
};

const Video = styled('video')({
  width: '100%',
  maxHeight: '400px',
});

const VideoTrack = ({ track }: Props) => {
  const ref = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    const el = ref.current;
    el.muted = true;
    if (track !== null && track) track.attach(el);
    return () => {
      if (track !== null && track) track.detach(el);
      el.srcObject = null;
    };
  }, [track]);

  return <Video ref={ref}></Video>;
};

export default VideoTrack;
