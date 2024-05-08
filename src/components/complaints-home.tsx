import {type ComplaintExtends} from "@/actions/complaints/get-filtered-complaints";

import {ComplaintCard} from "./complaint-card";

interface ComplaintsHomeProps {
  complaints: ComplaintExtends[];
}

export const ComplaintsHome: React.FC<ComplaintsHomeProps> = ({complaints}) => {
  return (
    <section className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {complaints.length ? (
        complaints.map((complaint) => <ComplaintCard key={complaint.id} complaint={complaint} />)
      ) : (
        <p>No hay quejas</p>
      )}
    </section>
  );
};
