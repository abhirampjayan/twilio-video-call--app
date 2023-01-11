import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';
import { RemoteParticipant } from 'twilio-video';

interface IParticipantsSlice {
  participants: RemoteParticipant[];
}

const initialState: IParticipantsSlice = { participants: [] };

export const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    addParticipant: (state, action) => {
      state.participants = [...state.participants, action.payload];
    },
    removeParticipant: (state, action) => {
      state.participants = state.participants.filter(
        (p) => p !== action.payload
      );
    },
  },
});

export const getParticipants = (state: RootState) =>
  state.participants.participants;

export const { removeParticipant, addParticipant } = participantsSlice.actions;

export default participantsSlice.reducer;
