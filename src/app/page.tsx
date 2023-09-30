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
      <LinkForm data={user} />
    </div>
  );
}
