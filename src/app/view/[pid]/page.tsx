import { FC } from "react";
import { Metadata } from "next";

import ProfileCard from "@/components/ProfileCard";
import { getProfileData } from "./actions";

export const metadata: Metadata = {
  title: "View Profile | oktaaniLINK",
  description: "View your profile",
};

interface PageProps {
  params: { pid: string };
}

const Page: FC<PageProps> = async ({ params }) => {
  const profile = await getProfileData(params.pid);

  if (!profile)
    return (
      <div className="container mt-4 text-primary">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          View Profile
        </h1>
        <p>Not Found!</p>
      </div>
    );

  return (
    <div className="container mt-4 text-primary">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        View Profile
      </h1>
      <p className="mb-4 mt-2 text-sm text-muted-foreground">
        Viewing profile {profile.displayName}
      </p>
      <div className="container mt-8 flex justify-center gap-4">
        <ProfileCard key={profile.id} profileData={profile} />
      </div>
    </div>
  );
};

export default Page;
