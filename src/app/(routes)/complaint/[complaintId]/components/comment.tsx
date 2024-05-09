import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {type CommentExtends} from "@/actions/complaints/get-filtered-complaints";

import {ButtonActionsComments} from "./button-actions-comments";

interface CommentProps {
  comment: CommentExtends;
}

export const Comment: React.FC<CommentProps> = ({comment}) => {
  const isAnonymous = comment?.anonymous === true;

  const avatarImage = isAnonymous
    ? "https://github.com/shadcn.png"
    : comment?.author?.image ?? "https://github.com/shadcn.png";

  const avatarName = isAnonymous ? "Anónimo" : comment?.author?.username ?? "Anónimo";

  const userReputation: number | undefined = comment?.author?.reputation ?? 0;

  const textReputation =
    userReputation < 50 ? "Inaceptable" : userReputation < 100 ? "Aceptable" : "Muy aceptable";

  return (
    <div className="flex gap-4">
      <Avatar className="h-10 w-10 border">
        <AvatarImage alt="@shadcn" src={avatarImage} />
        <AvatarFallback>{avatarName[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium">
            {avatarName}{" "}
            {userReputation ? (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                (Reputacion {textReputation} {userReputation})
              </span>
            ) : null}
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{comment.text}</p>
      </div>
      <ButtonActionsComments comment={comment} />
    </div>
  );
};
