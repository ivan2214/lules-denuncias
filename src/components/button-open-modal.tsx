"use client";
import {useCreateComplaimentModal} from "@/store/use-create-complaint-modal";

import {Button} from "./ui/button";

export const ButtonOpenModal = () => {
  const createComplaimentModal = useCreateComplaimentModal();

  return <Button onClick={createComplaimentModal.open}>Crear queja</Button>;
};
