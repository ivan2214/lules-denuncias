"use client";

import {useEffect, useState} from "react";

import {CreateComplaimentModal} from "@/components/modals/create-complaiment-modal";
import {ManageAccountUserModal} from "@/components/modals/manage-account-user-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateComplaimentModal />;
      <ManageAccountUserModal />
    </>
  );
};
