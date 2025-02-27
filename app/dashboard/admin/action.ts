"use server"

import { getInjection } from "@/di/container";
import { AuthenticationError } from "@/src/entities/error/auth";
import { InputParseError } from "@/src/entities/error/common";
import { signInSchemaType } from "@/src/entities/models/auth/login-schema";
import { Cookie } from "@/src/entities/models/cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAdmin(data: signInSchemaType) {
  let sessionCookie: Cookie;
  
  try {
    const signInAdminController = getInjection('ISignInAdminController');
    sessionCookie = await signInAdminController(data);

    const cookieInstance = await cookies();
    cookieInstance.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    if (
      error instanceof InputParseError ||
      error instanceof AuthenticationError
    ) {
      return {
        success: false,
        error: error.message
      }

    }
    console.log((error as Error).message)
    return {
      success: false,
      error: "Something went wrong"
    }


  }
  redirect(`/dashboard/admin/home`);
}