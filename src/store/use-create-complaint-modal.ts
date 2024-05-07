import {create} from "zustand";

interface CreateComplaimentModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreateComplaimentModal = create<CreateComplaimentModalStore>((set) => ({
  isOpen: false,
  open: () => set({isOpen: true}),
  close: () => set({isOpen: false}),
}));
