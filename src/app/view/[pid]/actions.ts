"use server";

import { db } from "@/lib/db";

export const getProfileData = async (id: string) => {
  const profile = await db.user.findUnique({
    where: {
      id,
      OR: [{ visibility: "Public" }, { visibility: "Unlisted" }],
    },
    select: {
      id: true,
      displayName: true,
      description: true,
      image: true,
      links: true,
    },
  });

  return profile;
};
