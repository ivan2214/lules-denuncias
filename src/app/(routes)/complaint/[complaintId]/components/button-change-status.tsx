"use client";

import {CheckIcon} from "lucide-react";

import {Button} from "@/components/ui/button";
import {useChangeStatusModal} from "@/store/use-change-status-modal";
import {type ChangeStatusFormValues} from "@/components/complaint/change-status-form";

interface ButtonChangeStatusProps {
  complaintId: number;
  values: ChangeStatusFormValues;
}

export const ButtonChangeStatus: React.FC<ButtonChangeStatusProps> = ({complaintId, values}) => {
  const {openChangeStatus} = useChangeStatusModal();

  return (
    <Button
      className="flex items-center gap-x-2"
      size="sm"
      variant="outline"
      onClick={() => openChangeStatus(complaintId, values)}
    >
      <CheckIcon className="h-4 w-4" />
      Change Status
    </Button>
  );
};
