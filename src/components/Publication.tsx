import React from 'react';

import {
  LocalTrackPublication,
  Participant,
  RemoteTrackPublication,
  Track,
} from 'twilio-video';
import useTrack from '../hooks/useTrack';
import useTracks from '../hooks/useTracks';
import VideoTrack from './VideoTrack';

interface PublicationProps {
  publication: LocalTrackPublication | RemoteTrackPublication;
  participant: Participant;
  isLocalParticipant?: boolean;
  videoOnly?: boolean;
  videoPriority?: Track.Priority | null;
}

export default function Publication({
  publication,
  isLocalParticipant,
}: PublicationProps) {
  const track = useTrack(publication);

  if (!track) return null;

  // Even though we only have one case here, let's keep this switch() in case
  // we even need to add a 'data' case for rendering DataTracks.
  switch (track.kind) {
    case 'video':
      return (
        <VideoTrack
          track={track}
          //   isLocal={!track.name.includes('screen') && isLocalParticipant}
        />
      );
    // All participant audio tracks are rendered in ParticipantAudioTracks.tsx
    default:
      return null;
  }
}
