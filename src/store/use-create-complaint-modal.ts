import {create} from "zustand"

import {type CreateComplaimentFormValues} from "@/components/complaint/complaint-form"

interface CreateComplaimentModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
  openEditModal: (complaintId: number, data: CreateComplaimentFormValues) => void
  clearData: () => void
  data?: {
    complaintId: number
    values: CreateComplaimentFormValues
  }
}

export const useCreateComplaimentModal = create<CreateComplaimentModalStore>((set) => ({
  isOpen: false,
  open: () => set({isOpen: true}),
  close: () => set({isOpen: false}),
  openEditModal: (complaintId, data) => set({isOpen: true, data: {complaintId, values: data}}),
  clearData: () =>
    set({
      data: {
        complaintId: 0,
        values: {
          title: "",
          description: "",
          categoriesNames: [],
          images: [],
          address: "",
        },
      },
    }),
}))
