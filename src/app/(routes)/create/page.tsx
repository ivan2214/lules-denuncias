import {db} from "@/lib/db";

import {CreateComplaintForm} from "./components/create-complaint-form";

const CreateComplaintPage = async () => {
  const categories = await db.category.findMany();

  return (
    <section>
      <CreateComplaintForm userId={1} />
    </section>
  );
};

export default CreateComplaintPage;
