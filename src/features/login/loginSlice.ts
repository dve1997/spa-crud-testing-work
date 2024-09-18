import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useHttp, { AddressesRequests } from '../../shared/hooks/hookHTTP';

const initialState = {
  statusLoadingToken: 'loaded',
  tokenAuth: null,
};

export const fetchRespToken = createAsyncThunk(
  'resptoken/fetchRespToken',
  async (value: any) => {
    const { request } = useHttp();
    return request(
      AddressesRequests.AUTHORIZATION,
      'POST',
      {
        'Content-Type': 'application/json',
      },
      value,
    );
  },
);

// Token workflow overview, login and logout
const respToken = createSlice({
  name: 'resptoken',
  initialState,
  reducers: {
    updateToken: (state: any) => {
      state.tokenAuth = localStorage.getItem('token');
    },
    deleteToken: state => {
      state.tokenAuth = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRespToken.pending, state => {
        state.statusLoadingToken = 'idle';
      })
      .addCase(fetchRespToken.fulfilled, (state: any, action: any) => {
        state.statusLoadingToken = 'loaded';
        state.tokenAuth = action.payload.data?.token;
        localStorage.setItem('token', action.payload.data?.token);
      })
      .addCase(fetchRespToken.rejected, state => {
        state.statusLoadingToken = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = respToken;
export const { updateToken, deleteToken } = actions;
export default reducer;
