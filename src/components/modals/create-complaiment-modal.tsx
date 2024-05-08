import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {useCreateComplaimentModal} from "@/store/use-create-complaint-modal";

import {ComplaintForm} from "../complaint/complaint-form";

export const CreateComplaimentModal = () => {
  const {isOpen, close} = useCreateComplaimentModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="h-[calc(100%-5rem)] w-full overflow-y-auto">
        <DialogHeader className="space-y-0">
          <div className="flex flex-col space-y-1.5">
            <DialogTitle>Crear queja</DialogTitle>
            <DialogDescription>Por favor ingresa los datos de la queja</DialogDescription>
          </div>
        </DialogHeader>
        <ComplaintForm />
      </DialogContent>
    </Dialog>
  );
};
