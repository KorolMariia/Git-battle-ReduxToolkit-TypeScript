import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPlayer, fetchBattle } from '../api/api';
import { IBattleState, GetPlayerParams, Player } from '../types';

export const getPlayer = createAsyncThunk<Player, GetPlayerParams>(
  'battle/getPlayer',
  async ({ username }: GetPlayerParams) => {
    const data = await fetchPlayer(username);
    return data;
  },
);

export const getBattle = createAsyncThunk(
  'battle/getBattle',
  async (players: string[]) => {
    const data = await fetchBattle(players);
    return data;
  },
);

const initialState: IBattleState = {
  playersIds: [1, 2],
  loadingPlayer: { 1: false, 2: false },
  initialStatePlayers: {
    1: { username: '', avatar: null },
    2: { username: '', avatar: null },
  },
  errorPlayer: { 1: '', 2: '' },
  loadingBattle: false,
  resultsBattle: [],
  errorBattle: null,
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    handleReset: (state, action) => {
      const id = action.payload;
      state.initialStatePlayers[id].username = '';
      state.initialStatePlayers[id].avatar = null;
      state.errorPlayer[id] = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPlayer.pending, (state, action) => {
        const { id } = action.meta.arg;
        state.loadingPlayer = { [id]: true };
        state.errorPlayer = { [id]: '' };
      })
      .addCase(getPlayer.fulfilled, (state, action) => {
        const { id } = action.meta.arg;
        state.loadingPlayer = { [id]: false };
        state.initialStatePlayers[id].username = action.payload.login;
        state.initialStatePlayers[id].avatar = action.payload.avatar_url;
      })
      .addCase(getPlayer.rejected, (state, action) => {
        const { id } = action.meta.arg;
        state.loadingPlayer = { [id]: false };
        state.errorPlayer = { [id]: 'Not Found' };
      })
      .addCase(getBattle.pending, (state) => {
        state.loadingBattle = true;
        state.resultsBattle = [];
        state.errorBattle = null;
      })
      .addCase(getBattle.fulfilled, (state, action) => {
        state.loadingBattle = false;
        state.resultsBattle = action.payload;
        state.errorBattle = null;
      })
      .addCase(getBattle.rejected, (state, action) => {
        state.loadingBattle = false;
        state.resultsBattle = [];
        state.errorBattle = action.payload;
      });
  },
});

export const { handleReset } = battleSlice.actions;

export default battleSlice.reducer;
