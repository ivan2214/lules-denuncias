"use client";
import Link from "next/link";
import {signOut} from "next-auth/react";
import {type Account, type User} from "@prisma/client";

import {Separator} from "@ui/separator";
import Icon, {type IconProps} from "@components/icon";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {useManageAccountUserModal} from "@/store/use-manage-account-user-modal";

export interface Route {
  name: string;
  icon?: IconProps["name"];
  href: string;
}

const routesUser: Route[] = [
  {
    name: "Ayuda",
    icon: "badge-help",
    href: "/faqs",
  },
];

export interface ExtendsUser extends User {
  accounts: Account[];
}

const MenuUser = ({user}: {user: ExtendsUser}) => {
  const {openEditModal} = useManageAccountUserModal();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="grid h-10 w-10 place-items-center rounded-full border-2 border-gray-200 hover:border-gray-300 focus:outline-none"
          size="icon"
          variant="ghost"
        >
          <img
            alt="Avatar"
            className="rounded-full object-cover"
            height="35"
            src={user?.image ?? ""}
            style={{
              aspectRatio: "35/35",
              objectFit: "cover",
            }}
            width="35"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0" side="bottom">
        <div className="flex flex-col gap-3 p-4">
          <p className="text-base font-light">{user?.email}</p>

          <Button
            variant="outline"
            onClick={() =>
              openEditModal(user?.id, {
                name: user?.name,
                email: user?.email,
                username: user?.username,
                accountIds: user?.accounts.map((account) => account.id),
                image: user?.image,
                accounts: user?.accounts,
              })
            }
          >
            Cuenta
          </Button>

          <Separator />

          {routesUser?.map((route) => (
            <Link
              key={route.name}
              className="flex items-center gap-2 text-base font-light transition hover:text-primary"
              href={route.href}
            >
              {route.icon ? <Icon name={route.icon} /> : null}
              <span>{route.name}</span>
            </Link>
          ))}
          <Separator />
          <Button
            onClick={async () => {
              await signOut();
            }}
          >
            Cerrar sesión
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MenuUser;
