"use client"

import {signIn} from "next-auth/react"
import {ChromeIcon, GithubIcon} from "lucide-react"

import {Button} from "@ui/button"

export const Social = () => {
  const onCLick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/",
    })
  }

  return (
    <div className="flex w-full items-center justify-center gap-x-2">
      <Button className="w-full" size="lg" variant="outline" onClick={() => onCLick("google")}>
        <ChromeIcon className="h-5 w-5" />
      </Button>
      <Button className="w-full" size="lg" variant="outline" onClick={() => onCLick("github")}>
        <GithubIcon className="h-5 w-5" />
      </Button>
    </div>
  )
}
