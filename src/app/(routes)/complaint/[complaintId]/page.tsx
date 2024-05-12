import {
  CheckIcon,
  ClockIcon,
  FlagIcon,
  LocateIcon,
  MailIcon,
  ShareIcon,
  TagIcon,
  ThumbsUpIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

import {Button} from "@/components/ui/button";
import {db} from "@/lib/db";
import {type ComplaintExtends} from "@/actions/complaints/get-filtered-complaints";
import ImageSkeleton from "@/components/image-skeleton";
import {type CreateComplaimentFormValues} from "@/components/complaint/complaint-form";
import {auth} from "auth";

import {ButtonOpenModalEdit} from "./components/button-open-modal-edit";
import {Comments} from "./components/comment/comments";
import {ButtonVotes} from "./components/vote/button-votes";

interface ComplaintPageProps {
  params: {complaintId: string};
}

const ComplaintPage: React.FC<ComplaintPageProps> = async ({params}) => {
  const session = await auth();
  const userId = session?.user?.id;
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
        orderBy: {
          createdAt: "desc",
        },
      },
      user: true,
      votes: true,
    },
  });

  console.log(complaint?.user);

  if (!complaint) {
    return <div>Complaint not found</div>;
  }

  const isAuthorComplaint = userId === complaint.user?.id;

  const values: CreateComplaimentFormValues = {
    description: complaint.description,
    address: complaint.address ?? "",
    title: complaint.title,
    categoriesNames: complaint.categories.map((category) => ({
      name: category.name,
    })),
    images: complaint.images.map((image) => ({
      url: image.url || "https://via.placeholder.com/600x400",
    })),
  };

  const creatorName = (user: ComplaintExtends["user"]) => {
    if (user) {
      return user.name || user.username || "Anónimo";
    }

    return "Anónimo";
  };

  return (
    <main className="p-12">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{complaint.title}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Repordado por {creatorName(complaint.user)} el{" "}
              {new Date(complaint.createdAt).toLocaleDateString()}
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
                <span className="text-sm font-medium">Categorías:</span>
                {complaint.categories.map((category) => (
                  <span key={category.name} className="text-sm text-gray-500 dark:text-gray-400">
                    {category.name}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <FlagIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Prioridad:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {complaint.priority === 0
                    ? "Baja"
                    : complaint.priority === 1
                      ? "Mediaum"
                      : "Alta"}{" "}
                  ({complaint.priority})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Creado por:</span>
                <Link className="text-sm text-blue-600 hover:underline dark:text-blue-400" href="#">
                  {complaint.user?.username}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <LocateIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Ubicación:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {complaint.address}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Creado:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Ultima actualización:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(complaint.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FlagIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Estado:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Open</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUpIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Votos:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {complaint.votes.length} {complaint.votes.length === 1 ? "voto" : "votos"}
                </span>
              </div>
            </div>
          </div>
          {/* Votar prioridad */}

          <ButtonVotes complaint={complaint} />
          {/* Comments */}
          <Comments complaint={complaint} isAuthorComplaint={isAuthorComplaint} />
          {/* Actions */}
          <div className="flex justify-between gap-2">
            {isAuthorComplaint ? (
              <div className="flex gap-2">
                {isAuthorComplaint ? (
                  <ButtonOpenModalEdit complaintId={complaint.id} values={values} />
                ) : null}
                <Button className="flex items-center gap-x-2" size="sm" variant="outline">
                  <CheckIcon className="h-4 w-4" />
                  Mark as Resolved
                </Button>
                <Button className="flex items-center gap-x-2" size="sm" variant="outline">
                  <TrashIcon className="h-4 w-4" />
                  Delete Complaint
                </Button>
              </div>
            ) : null}
            <div className="flex gap-2">
              <Button className="flex items-center gap-x-2" size="sm" variant="outline">
                <ShareIcon className="h-4 w-4" />
                Share
              </Button>
              <Button className="flex items-center gap-x-2" size="sm" variant="outline">
                <MailIcon className="h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ComplaintPage;
