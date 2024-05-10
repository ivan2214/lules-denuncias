import {auth} from "auth";

export const MenuAuth = async () => {
  const session = await auth();

  console.log(session);

  return <div>MenuAuth</div>;
};
