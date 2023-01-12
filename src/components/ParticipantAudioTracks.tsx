import { useEffect } from 'react';
import { RemoteAudioTrack, RemoteParticipant } from 'twilio-video';
import { useAppDispatch, useAppSelector } from '../hooks/reducAppHooks';
import useTracks from '../hooks/useTracks';
import {
  addParticipant,
  getParticipants,
  removeParticipant,
} from '../store/slices/participantsSclice';
import { getRoom } from '../store/slices/roomSlice';
import AudioTrack from './AudioTrack';

function Participant({ participant }: { participant: RemoteParticipant }) {
  const tracks = useTracks(participant);
  const audioTrack = tracks.find((track) => track.kind === 'audio') as
    | RemoteAudioTrack
    | undefined;

  if (audioTrack?.kind === 'audio') return <AudioTrack track={audioTrack} />;

  return null;
}

/*
  This ParticipantAudioTracks component will render the audio track for all participants in the room.
  It is in a separate component so that the audio tracks will always be rendered, and that they will never be 
  unnecessarily unmounted/mounted as the user switches between Gallery View and Speaker View.
*/
export function ParticipantAudioTracks() {
  const participants = useAppSelector(getParticipants);
  const room = useAppSelector(getRoom);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (room) {
      room.participants.forEach((participant) => {
        dispatch(addParticipant(participant));
      });
      const participantConnected = (participant: RemoteParticipant) =>
        dispatch(addParticipant(participant));

      const participantDisconnected = (participant: RemoteParticipant) =>
        dispatch(removeParticipant(participant));

      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);

      return () => {
        room.off('participantConnected', participantConnected);
        room.off('participantDisconnected', participantDisconnected);
      };
    }
  }, [room]);
  return (
    <>
      {participants.map((participant) => (
        <Participant key={participant.sid} participant={participant} />
      ))}
    </>
  );
}
