import Link from "next/link";

import {auth} from "auth";

import {Button} from "./ui/button";
import MenuUser from "./menu-user";

export const MenuAuth = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <section className="flex items-center gap-x-4">
      {session ? (
        <MenuUser user={user} />
      ) : (
        <Button className="text-foreground" variant="link">
          <Link href="/auth/login">Login</Link>
        </Button>
      )}
      {!session && (
        <Button className="text-foreground" variant="link">
          <Link href="/auth/register">Register</Link>
        </Button>
      )}
    </section>
  );
};
