import {create} from "zustand"
import {type Account} from "@prisma/client"

import {type ManageAccountUserFormValues} from "@/components/account/manage-account-user-form"

interface ManageAccountUserModalStore {
  isOpen: boolean
  close: () => void
  openEditModal: (userId: string, data: ManageAccountUserFormValues & {accounts: Account[]}) => void
  data: {
    userId: string
    values: ManageAccountUserFormValues
    accounts: Account[]
  }
}

export const useManageAccountUserModal = create<ManageAccountUserModalStore>((set) => ({
  isOpen: false,
  data: {
    userId: "",
    values: {
      name: "",
      email: "",
      username: "",
      accountIds: [],
      image: "",
    },
    accounts: [],
  },
  close: () => set({isOpen: false}),
  openEditModal: (userId, data) =>
    set({isOpen: true, data: {userId, values: data, accounts: data.accounts}}),
}))
