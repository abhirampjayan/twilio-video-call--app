import { Box, Container, Grid } from '@mui/material';
import { height } from '@mui/system';
import React, { useEffect, useState } from 'react';
import {
  LocalAudioTrack,
  LocalVideoTrack,
  Participant,
  RemoteParticipant,
} from 'twilio-video';
import { useAppSelector } from '../hooks/reducAppHooks';
import usePublications from '../hooks/usePublications';
import { getLocalTracks } from '../store/slices/localTrackSlice';
import { getParticipants } from '../store/slices/participantsSclice';
import Publication from './Publication';
import VideoTrack from './VideoTrack';

type Props = { participant: RemoteParticipant };

const ParticipantVideo = ({ participant }: Props) => {
  const publications = usePublications(participant);
  return (
    <>
      {publications.map((publication) => (
        <Publication
          publication={publication}
          participant={participant}
          videoOnly
        />
      ))}
    </>
  );
};

const ParticipantsVideoTracks = () => {
  const participants = useAppSelector(getParticipants);
  const localTracks = useAppSelector(getLocalTracks);
  const [grid, setGrid] = useState<number>(1);

  const videoTrack = localTracks.find(
    (track: LocalVideoTrack | LocalAudioTrack) => track.kind === 'video'
  ) as LocalVideoTrack;

  useEffect(() => {
    setGrid(Math.round(Math.sqrt(participants.length + 1)));
  }, [participants.length]);

  return (
    <Container>
      <Grid
        container
        columns={grid}
        justifyContent="center"
        sx={{ width: '100%', height: '100%' }}
      >
        <Grid
          item
          xs={1}
          justifyContent={'center'}
          alignItems="center"
          display="flex"
        >
          <Box
            sx={{ width: '100%', height: '100%' }}
            display="flex"
            justifyContent={'center'}
            alignItems="center"
            p={3}
          >
            <VideoTrack track={videoTrack} />
          </Box>
        </Grid>
        {participants.map((participant: RemoteParticipant) => (
          <Grid
            item
            xs={1}
            justifyContent={'center'}
            alignItems="center"
            display="flex"
          >
            <Box
              sx={{ width: '100%', height: '100%' }}
              justifyContent={'center'}
              alignItems="center"
              display="flex"
              p={3}
            >
              <ParticipantVideo participant={participant} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ParticipantsVideoTracks;
