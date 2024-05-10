"use client";
import {FaGithub} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {signIn} from "next-auth/react";

import {Button} from "@ui/button";

import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

export const Social = () => {
  const onCLick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center justify-center gap-x-2">
      <Button className="w-full" size="lg" variant="outline" onClick={() => onCLick("google")}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button className="w-full" size="lg" variant="outline" onClick={() => onCLick("github")}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
