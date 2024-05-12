import {create} from "zustand";

import {type ChangeStatusFormValues} from "@/components/complaint/change-status-form";

interface ChangeStatusModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  openChangeStatus: (complaintId: number, data: ChangeStatusFormValues) => void;
  clearData: () => void;
  data?: {
    complaintId: number;
    values: ChangeStatusFormValues;
  };
}

export const useChangeStatusModal = create<ChangeStatusModalStore>((set) => ({
  isOpen: false,
  open: () => set({isOpen: true}),
  close: () => set({isOpen: false}),
  openChangeStatus: (complaintId, data) => set({isOpen: true, data: {complaintId, values: data}}),
  clearData: () =>
    set({
      data: {
        complaintId: 0,
        values: "",
      },
    }),
}));
