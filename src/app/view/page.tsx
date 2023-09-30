import { FC } from "react";

import ProfileCard from "@/components/ProfileCard";
import { db } from "@/lib/db";

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
      <>
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Explore Profiles
        </h1>
        <p>Not Found!</p>
      </>
    );

  return (
    <>
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Explore Profiles
      </h1>
      <ul className="container mt-8 grid gap-2">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profileData={profile} />
        ))}
      </ul>
    </>
  );
};

export default Page;
