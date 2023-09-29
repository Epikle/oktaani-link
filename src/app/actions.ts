"use server";

import { FormValues } from "@/components/LinkForm";
import { db } from "@/lib/db";

export const updateProfile = async (userId: string, values: FormValues) => {
  const newLinks = values.links.map((link) => ({ ...link, userId }));

  console.log(values);

  await db.link.deleteMany({ where: { userId } });
  await db.link.createMany({ data: newLinks });
  await db.user.update({
    where: { id: userId },
    data: { displayName: values.displayName, description: values.description },
  });
};
