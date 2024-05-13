"use client"
import {useCreateComplaimentModal} from "@/store/use-create-complaint-modal"

import {Button} from "./ui/button"

export const ButtonOpenModal = () => {
  const {open, clearData} = useCreateComplaimentModal()

  return (
    <Button
      onClick={() => {
        clearData()
        open()
      }}
    >
      Crear queja
    </Button>
  )
}
