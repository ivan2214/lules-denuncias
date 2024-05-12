"use client";

import {LoaderIcon, TrashIcon} from "lucide-react";
import {useTransition} from "react";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {deleteComplaint} from "@/actions/server-actions/complaint/delete-complaint";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ButtonDeleteComplaintProps {
  complaintId: number;
}

export const ButtonDeleteComplaint: React.FC<ButtonDeleteComplaintProps> = ({complaintId}) => {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      deleteComplaint(complaintId).then((res) => {
        if (res?.error) {
          toast("Error", {
            description: res?.error,
          });
        }
        if (res?.success) {
          toast("Complaint deleted", {
            description: res?.success,
          });
        }
      });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-x-2" variant="outline">
          <TrashIcon className="h-4 w-4" />
          Borrar queja
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro de eliminar esta queja?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente la queja y eliminará
            sus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-white" onClick={onClick}>
            {isPending ? <LoaderIcon className="h-4 w-4 animate-spin" /> : null}
            {isPending ? "Eliminando..." : "Eliminar queja"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
/* <Button
      className="flex items-center gap-x-2"
      disabled={isPending}
      size="sm"
      variant="outline"
      onClick={onClick}
    >

    </Button> */
