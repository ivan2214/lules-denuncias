"use client"

import {ArrowDown, ArrowUp, Equal} from "lucide-react"

interface ArrowPrioriryProps {
  priority: "Baja" | "Media" | "Alta"
}

export const ArrowPrioriry: React.FC<ArrowPrioriryProps> = ({priority}) => {
  if (priority === "Baja") return <ArrowDown className="text-red-500" />

  if (priority === "Media") return <Equal className="text-yellow-500" />

  if (priority === "Alta") return <ArrowUp className="text-green-500" />
}
