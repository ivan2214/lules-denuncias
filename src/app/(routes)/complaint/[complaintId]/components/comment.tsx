import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {type CommentExtends} from "@/actions/complaints/get-filtered-complaints";

interface CommentProps {
  comment: CommentExtends;
}

export const Comment: React.FC<CommentProps> = ({comment}) => {
  const isAnonymous = comment.anonymous === true;

  if (isAnonymous) {
    return (
      <div className="flex gap-4">
        <Avatar className="h-10 w-10 border">
          <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">
              Autor: <span className="text-gray-500 dark:text-gray-400">Anónimo</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{comment.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <Avatar className="h-10 w-10 border">
        <AvatarImage alt="@shadcn" src={comment.author?.image ?? "https://github.com/shadcn.png"} />
        <AvatarFallback>{comment.author?.username?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium">
            Autor:{" "}
            <span className="text-gray-500 dark:text-gray-400">{comment.author?.username}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{comment.text}</p>
      </div>
    </div>
  );
};
