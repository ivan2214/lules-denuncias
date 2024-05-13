import type {ComplaintExtends} from "@/actions/complaints/get-filtered-complaints"

import {auth} from "auth"

import {Comment} from "./comment"
import {CommentForm} from "./comment-form"

interface CommentsProps {
  complaint: ComplaintExtends
  isAuthorComplaint?: boolean
}

export const Comments: React.FC<CommentsProps> = async ({complaint, isAuthorComplaint}) => {
  const session = await auth()
  const userId = session?.user?.id

  return (
    <div className="space-y-4">
      <CommentForm complaintId={complaint?.id} />
      {/* List of comments */}
      {complaint?.comments?.length > 0 && (
        <div className="space-y-4">
          {complaint?.comments?.map((comment) => (
            <Comment
              key={comment?.id}
              comment={comment}
              isAuthorComment={comment?.authorId === userId}
              isAuthorComplaint={isAuthorComplaint}
            />
          ))}
        </div>
      )}
    </div>
  )
}
