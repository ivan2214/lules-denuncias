import {TriangleAlertIcon} from "lucide-react"

import CardWrapper from "@components/auth/card-wrapper"

export const ErrorCard = () => {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      hederLabel="Oops, something went wrong"
    >
      <div className="flex w-full items-center justify-center">
        <TriangleAlertIcon className="text-destructive" />
      </div>
    </CardWrapper>
  )
}
