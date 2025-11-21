import { createSlice } from '@reduxjs/toolkit';
import type { UiState } from '../../types/store';

const initialState: UiState = {
  isModalOpen: false,
  modalType: undefined,
  isLoading: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenModal: (state) => {
      state.isModalOpen = true;
    },
    onCloseModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { onOpenModal, onCloseModal } = uiSlice.actions;
