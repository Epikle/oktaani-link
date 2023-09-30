import { FC } from "react";
import { Metadata } from "next";

import ProfileCard from "@/components/ProfileCard";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Explore Profiles | oktaaniLINK",
  description: "Explore all the public profiles",
};

const Page: FC = async () => {
  const profiles = await db.user.findMany({
    where: {
      visibility: "Public",
    },
    include: {
      links: true,
    },
  });

  if (!profiles || profiles.length === 0)
    return (
      <div className="container mt-4 text-primary">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Explore Profiles
        </h1>
        <p>Not Found!</p>
      </div>
    );

  return (
    <div className="container mt-4 text-primary">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Explore Profiles
      </h1>
      <ul className="container mt-8 grid gap-2">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profileData={profile} />
        ))}
      </ul>
    </div>
  );
};

export default Page;
