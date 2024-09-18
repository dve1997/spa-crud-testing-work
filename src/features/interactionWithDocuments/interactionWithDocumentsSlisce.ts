import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import useHttp, { AddressesRequests } from '../../shared/hooks/hookHTTP';

export const documentsAdapter = createEntityAdapter();
const initialState = documentsAdapter.getInitialState({
  statusLoadingDocuments: 'loaded',
});

export const fetchRespDocuments = createAsyncThunk(
  'respdocuments/fetchRespDocuments',
  async () => {
    const { request } = useHttp();
    return request(AddressesRequests.READ_DOCUMENTS, 'GET', {
      'x-auth': localStorage.getItem('token'),
    });
  },
);

export const fetchCreateDocument = createAsyncThunk(
  'createdocument/fetchCreateDocument',
  async (value: any) => {
    const { request } = useHttp();
    return request(
      AddressesRequests.CREATE_DOCUMENT,
      'POST',
      {
        'x-auth': localStorage.getItem('token'),
      },
      value,
    );
  },
);

export const fetchDeleteDocument = createAsyncThunk(
  'deletedocument/fetchDeleteDocument',
  async (value: any) => {
    const { request } = useHttp();
    return request(
      AddressesRequests.DELETE_DOCUMENT,
      'POST',
      {
        'x-auth': localStorage.getItem('token'),
      },
      value,
      value.id,
    );
  },
);

export const fetchUpdateDocument = createAsyncThunk(
  'updatedocument/fetchUpdateDocument',
  async (value: any) => {
    const { request } = useHttp();
    return request(
      AddressesRequests.UPDATE_DOCUMENT,
      'POST',
      {
        'x-auth': localStorage.getItem('token'),
      },
      value,
      value.id,
    );
  },
);

// Operations CRUD slice
const respToken = createSlice({
  name: 'resptoken',
  initialState,
  reducers: {
    deleteDocument: (state: any, action: any) => {
      documentsAdapter.removeOne(state, action.payload.id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRespDocuments.pending, state => {
        state.statusLoadingDocuments = 'idle';
      })
      .addCase(fetchRespDocuments.fulfilled, (state: any, action: any) => {
        state.statusLoadingDocuments = 'loaded';
        documentsAdapter.setAll(state, action.payload.data);
      })
      .addCase(fetchRespDocuments.rejected, state => {
        state.statusLoadingDocuments = 'error';
      })
      .addCase(fetchCreateDocument.pending, state => {
        state.statusLoadingDocuments = 'idle';
      })
      .addCase(fetchCreateDocument.fulfilled, (state: any, action: any) => {
        state.statusLoadingDocuments = 'loaded';
        documentsAdapter.addOne(state, action.payload.data);
      })
      .addCase(fetchCreateDocument.rejected, state => {
        state.statusLoadingDocuments = 'error';
      })
      .addCase(fetchDeleteDocument.pending, state => {
        state.statusLoadingDocuments = 'idle';
      })
      .addCase(fetchDeleteDocument.fulfilled, (state: any) => {
        state.statusLoadingDocuments = 'loaded';
      })
      .addCase(fetchDeleteDocument.rejected, state => {
        state.statusLoadingDocuments = 'error';
      })
      .addCase(fetchUpdateDocument.pending, state => {
        state.statusLoadingDocuments = 'idle';
      })
      .addCase(fetchUpdateDocument.fulfilled, (state: any, action: any) => {
        state.statusLoadingDocuments = 'loaded';
        documentsAdapter.upsertOne(state, action.payload.data);
      })
      .addCase(fetchUpdateDocument.rejected, state => {
        state.statusLoadingDocuments = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = respToken;
export const { deleteDocument } = actions;
export default reducer;
