"use client"
import Link from "next/link"

import {Button} from "@/components/ui/button"

interface BackButtonProps {
  label: string
  href: string
}

export const BackButton: React.FC<BackButtonProps> = ({label, href}) => {
  return (
    <Button asChild className="w-full font-normal" size="sm" variant="link">
      <Link href={href}>{label}</Link>
    </Button>
  )
}
