"use client";

import {PencilIcon} from "lucide-react";

import {Button} from "@/components/ui/button";
import {useCreateComplaimentModal} from "@/store/use-create-complaint-modal";
import {type CreateComplaimentFormValues} from "@/components/complaint/complaint-form";

interface ButtonOpenModalEditProps {
  complaintId: number;
  values: CreateComplaimentFormValues;
}

export const ButtonOpenModalEdit: React.FC<ButtonOpenModalEditProps> = ({complaintId, values}) => {
  const {openEditModal} = useCreateComplaimentModal();

  return (
    <Button className="absolute right-96 top-10" onClick={() => openEditModal(complaintId, values)}>
      <PencilIcon />
    </Button>
  );
};
