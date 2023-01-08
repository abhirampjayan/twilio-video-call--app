import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { LocalVideoTrack, RemoteVideoTrack } from 'twilio-video';

type Props = {
  track: LocalVideoTrack | RemoteVideoTrack;
};
const Video = styled('video')({
  width: '100%',
  height: '100%',
});

const VideoTrack = ({ track }: Props) => {
  const ref = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    const el = ref.current;
    el.muted = true;
    track.attach(el);
    return () => {
      track.detach(el);
      el.srcObject = null;
    };
  }, [track]);

  return <Video ref={ref}></Video>;
};

export default VideoTrack;
