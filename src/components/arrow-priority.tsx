"use client";

import {ArrowDown, ArrowUp, Equal} from "lucide-react";

interface ArrowPrioriryProps {
  priority: string;
}

export const ArrowPrioriry: React.FC<ArrowPrioriryProps> = ({priority}) => {
  if (priority === "LOW") return <ArrowDown className="text-red-500" />;

  if (priority === "MEDIUM") return <Equal className="text-yellow-500" />;

  if (priority === "HIGH") return <ArrowUp className="text-green-500" />;
};
