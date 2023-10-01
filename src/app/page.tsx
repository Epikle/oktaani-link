import { Metadata } from "next";

import LinkForm from "@/components/LinkForm";
import { getAuthSession } from "@/lib/auth";
import { getUserData } from "./actions";

export const metadata: Metadata = {
  title: "Customize your profile | oktaaniLINK",
  description:
    "Add/edit/remove links below and then share your profile with the world!",
};

export default async function Home() {
  const session = await getAuthSession();
  let user = null;

  if (session) {
    try {
      user = await getUserData(session.user.id);
    } catch (error) {
      return <p>Error</p>;
    }
  }

  if (!user) return null;

  return (
    <div className="container mt-4 text-primary">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Customize your profile
      </h1>
      <p className="mb-4 mt-2 text-sm text-muted-foreground">
        Add/edit/remove links below and then share your profile with the world!
      </p>
      <LinkForm data={user} />
    </div>
  );
}
