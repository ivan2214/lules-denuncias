import type {ComplaintExtends} from "@/actions/complaints/get-filtered-complaints";

import {Comment} from "./comment";
import {CommentForm} from "./comment-form";

interface CommentsProps {
  complaint: ComplaintExtends;
}

export const Comments: React.FC<CommentsProps> = ({complaint}) => {
  return (
    <div className="space-y-4">
      <CommentForm complaintId={complaint?.id} />
      {/* List of comments */}
      {complaint?.comments?.length > 0 && (
        <div className="space-y-4">
          {complaint?.comments?.map((comment) => <Comment key={comment?.id} comment={comment} />)}
        </div>
      )}
    </div>
  );
};
