// stores/useDialogStore.ts
import { create } from 'zustand';

export type DialogType = 'add' | 'editTransaction' | 'deleteConfirm' | null;

interface DialogState {
  dialogType: DialogType;
  dialogData?: any;

  openDialog: (type: DialogType, data?: any) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  dialogType: null,
  dialogData: null,
  openDialog: (type, data = null) =>
    set({ dialogType: type, dialogData: data }),
  closeDialog: () => set({ dialogType: null, dialogData: null }),
}));
