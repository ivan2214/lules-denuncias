import {
  CheckIcon,
  ClockIcon,
  FlagIcon,
  LocateIcon,
  MailIcon,
  PencilIcon,
  ShareIcon,
  TagIcon,
  ThumbsUpIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import {type Image} from "@prisma/client";

import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {db} from "@/lib/db";
import {type ComplaintExtends} from "@/actions/complaints/get-filtered-complaints";
import ImageSkeleton from "@/components/image-skeleton";
import {type CreateComplaimentFormValues} from "@/components/modals/create-complaiment-modal";

import {Comment} from "./components/comment";
import {ButtonOpenModalEdit} from "./components/button-open-modal-edit";

interface ComplaintPageProps {
  params: {complaintId: string};
}

const ComplaintPage: React.FC<ComplaintPageProps> = async ({params}) => {
  const userId = 1;
  const {complaintId} = params;

  const complaint: ComplaintExtends | null = await db.complaint.findUnique({
    where: {
      id: Number(complaintId),
    },
    include: {
      images: true,
      categories: true,
      comments: {
        include: {
          author: true,
        },
      },
      location: true,
      user: true,
      votes: true,
    },
  });

  if (!complaint) {
    return <div>Complaint not found</div>;
  }

  const isAuthor = userId === complaint.user.id;

  const values: CreateComplaimentFormValues = {
    description: complaint.description,
    latitude: complaint.location?.latitude ?? 0,
    longitude: complaint.location?.longitude ?? 0,
    address: complaint.location?.address ?? "",
    city: complaint.location?.city ?? "",
    country: complaint.location?.country ?? "",
    title: complaint.title,
    categoriesNames: complaint.categories.map((category) => ({
      name: category.name,
    })),
    images: complaint.images.map((image) => ({
      url: image.url || "https://via.placeholder.com/600x400",
    })),
  };

  return (
    <div className="relative px-4 py-6 md:px-6 lg:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{complaint.title}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Reported on {new Date(complaint.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="prose prose-gray dark:prose-invert">
            <p className="space-y-4 text-gray-500 dark:text-gray-400">{complaint.description}</p>
          </div>
          <picture className="grid grid-cols-2 gap-4">
            {complaint.images.map((image) => (
              <ImageSkeleton
                key={image.url}
                alt={complaint.title}
                className="aspect-video rounded-lg object-cover"
                src={image.url || "https://via.placeholder.com/600x400"}
              />
            ))}
          </picture>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TagIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Category:</span>
                {complaint.categories.map((category) => (
                  <span key={category.id} className="text-sm text-gray-500 dark:text-gray-400">
                    {category.name}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <FlagIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Priority:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {complaint.priority === 0 ? "Low" : complaint.priority === 1 ? "Medium" : "High"}{" "}
                  ({complaint.priority})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Reported by:</span>
                <Link className="text-sm text-blue-600 hover:underline dark:text-blue-400" href="#">
                  {complaint.user.username}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <LocateIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Location:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {complaint.location?.address} {complaint.location?.city}{" "}
                  {complaint.location?.country}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Created:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Reported on {new Date(complaint.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Last Updated:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(complaint.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FlagIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Status:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Open</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUpIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Votes:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {complaint.votes.length} {complaint.votes.length === 1 ? "vote" : "votes"}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Comments</h2>
              <Button size="sm" variant="outline">
                Add Comment
              </Button>
            </div>
            {complaint.comments.length > 0 && (
              <div className="space-y-4">
                {complaint.comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-between gap-2">
            {isAuthor ? (
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <PencilIcon className="h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <CheckIcon className="h-4 w-4" />
                  Mark as Resolved
                </Button>
                <Button size="sm" variant="outline">
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            ) : null}
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <ShareIcon className="h-4 w-4" />
                Share
              </Button>
              <Button size="sm" variant="outline">
                <MailIcon className="h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isAuthor ? <ButtonOpenModalEdit complaintId={complaint.id} values={values} /> : null}
    </div>
  );
};

export default ComplaintPage;
