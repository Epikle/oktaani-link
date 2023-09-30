import { Metadata } from "next";
import Link from "next/link";

import { UserAuthForm } from "@/components/UserAuthForm";

export const metadata: Metadata = {
  title: "Authentication | oktaaniLINK",
  description: "You need to authenticate before continuing.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container grid h-screen items-center justify-center p-0 lg:grid-cols-2">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:block">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 text-lg">
            <span>
              oktaani<span className="font-extrabold">LINK</span>
            </span>
          </div>
        </div>
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold uppercase tracking-tight">
                Login
              </h1>
              <p className="text-sm text-muted-foreground">
                Login with your Github account to continue
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
