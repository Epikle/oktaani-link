"use server";

import { db } from "@/lib/db";

export const getProfilesData = async () => {
  const profiles = await db.user.findMany({
    where: {
      visibility: "Public",
    },
    select: {
      id: true,
      displayName: true,
      description: true,
      image: true,
      links: true,
    },
  });

  return profiles;
};
