"use client";
import Link from "next/link";
import {type User} from "next-auth";
import {signOut} from "next-auth/react";

import {Separator} from "@ui/separator";
import {type IconProps} from "@components/icon";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";

export interface Route {
  name: string;
  icon?: IconProps["name"];
  href: string;
}

const routesUser: Route[] = [
  {
    name: "Cuenta",
    icon: "user",
    href: "/account",
  },
  {
    name: "Ayuda",
    icon: "badge-help",
    href: "/help",
  },
];

const MenuUser = ({user}: {user?: User}) => {
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
            src={user?.image ?? "https://i.pravatar.cc/300"}
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

          <Separator />

          {routesUser?.map((route) => (
            <Link
              key={route.name}
              className="flex items-center gap-2 text-base font-light transition hover:text-primary"
              href={route.href}
            >
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
