import {useManageAccountUserModal} from "@/store/use-manage-account-user-modal"
import {Dialog, DialogContent} from "@ui/dialog"
import {ManageAccountUserForm} from "@components/account/manage-account-user-form"

export const ManageAccountUserModal = () => {
  const {isOpen, close} = useManageAccountUserModal()

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="h-[calc(80%-10rem)] max-w-xs rounded lg:h-[calc(100%-5rem)] lg:max-w-screen-md">
        <ManageAccountUserForm />
      </DialogContent>
    </Dialog>
  )
}
