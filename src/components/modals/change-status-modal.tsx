import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {useChangeStatusModal} from "@/store/use-change-status-modal";
import {ChangeStatusSchemaForm} from "@components/complaint/change-status-form";

export const ChangeStatusModal = () => {
  const {isOpen, close} = useChangeStatusModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="h-[calc(100%-5rem)] w-full overflow-y-auto">
        <DialogHeader className="space-y-0">
          <div className="flex flex-col space-y-1.5">
            <DialogTitle>Cambiar estado</DialogTitle>
            <DialogDescription>Por favor cambia el estado de la queja</DialogDescription>
          </div>
        </DialogHeader>
        <ChangeStatusSchemaForm />
      </DialogContent>
    </Dialog>
  );
};
