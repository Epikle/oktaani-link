import { Metadata } from "next";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

import LinkForm from "@/components/LinkForm";
import TestLogout from "@/components/TestLogout";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Homepage",
  description: "hello",
};

export const getUserData = async (id: string) => {
  const data = await db.user.findUnique({
    where: { id },
    include: { links: true },
  });

  return data;
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
    <>
      <header className="flex items-center justify-between border-b-2 bg-gray-100 px-4 py-2">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-sm px-4 py-2 transition-colors hover:bg-gray-400"
          >
            <LinkIcon />
            <span>
              oktaani<span className="font-extrabold">LINK</span>
            </span>
          </Link>
          <ul>
            <Link href="/view" className="hover:underline">
              <li>Explore Profiles</li>
            </Link>
          </ul>
        </div>
        <nav>
          {session && (
            <TestLogout
              name={session.user.name}
              imgUrl={session.user.image}
              email={session.user.email}
            />
          )}
        </nav>
      </header>
      <div className="container mt-4 text-primary">
        <LinkForm data={user} />
      </div>
    </>
  );
}
