"use server";

import {AuthError} from "next-auth";

import {type LoginFormValues} from "@/components/auth/login-form";
import {LoginSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import {signIn} from "auth";

export const login = async (values: LoginFormValues) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid fields!"};
  }

  const {email, password} = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.email || !existingUser.hashPassword) {
    return {error: "Email does not exist"};
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {error: "Invalid credentials!"};
        default:
          return {error: "Something went wrong!"};
      }
    }
    throw error;
  }
};
