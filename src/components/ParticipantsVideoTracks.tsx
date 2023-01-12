import React from 'react';
import { Participant, RemoteParticipant } from 'twilio-video';
import { useAppSelector } from '../hooks/reducAppHooks';
import usePublications from '../hooks/usePublications';
import { getParticipants } from '../store/slices/participantsSclice';
import Publication from './Publication';

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
  //   const publications = usePublications();

  return (
    <div>
      {participants.map((participant) => (
        <>
          <ParticipantVideo participant={participant} />
        </>
      ))}
    </div>
  );
};

export default ParticipantsVideoTracks;
