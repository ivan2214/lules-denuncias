import Link from "next/link";
import {MapPinIcon} from "lucide-react";
import {type User, type Complaint, StatusComplaint} from "@prisma/client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {type ComplaintExtends} from "@/actions/complaints/get-filtered-complaints";

interface ComplaintCardProps {
  complaint: ComplaintExtends;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({complaint}) => {
  return (
    <Card key={complaint.id} className="flex flex-col">
      <CardHeader>
        <CardTitle>{complaint.title || "Pothole Complaint"}</CardTitle>
        <CardDescription>
          Reported by {complaint.user.username} on{" "}
          {new Date(complaint.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-500">123 Main St, Anytown USA</span>
        </div>
        <p className="mt-2 text-gray-500">
          {complaint.description ||
            "There is a large pothole on the corner that is causing damage to vehicles. Please fix it as soon as possible."}
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="flex items-center justify-between gap-x-2">
          <Badge
            className={cn(
              complaint.isResolved
                ? "bg-green-500"
                : complaint.status === StatusComplaint.IN_PROGRESS ||
                    complaint.status === StatusComplaint.OPEN
                  ? "bg-yellow-500"
                  : "bg-red-500",
            )}
            variant="secondary"
          >
            {complaint.status}
          </Badge>
          <Link className="text-sm text-gray-500 hover:underline" href="#">
            View Details
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
