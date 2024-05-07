import {db} from "@/lib/db";

interface ComplaintPageProps {
  params: {complaintId: string};
}

const ComplaintPage: React.FC<ComplaintPageProps> = async ({params}) => {
  const {complaintId} = params;

  const complaint = await db.complaint.findUnique({
    where: {
      id: Number(complaintId),
    },
  });

  return <div>Complaint</div>;
};

export default ComplaintPage;
