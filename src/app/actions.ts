"use server";

import { FormValues } from "@/components/LinkForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateProfile = async (values: FormValues) => {
  const session = await getAuthSession();

  if (!session || !session?.user) return;

  const { id: userId } = session.user;

  const newLinks = values.links.map((link) => ({ ...link, userId }));

  await db.link.deleteMany({ where: { userId } });
  await db.link.createMany({ data: newLinks });
  await db.user.update({
    where: { id: userId },
    data: {
      displayName: values.displayName,
      description: values.description,
      visibility: values.visibility,
    },
  });

  revalidatePath("/");
  revalidatePath("/view");
};

export const getUserData = async (id: string) => {
  const data = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      displayName: true,
      description: true,
      image: true,
      links: true,
      visibility: true,
      name: true,
      email: true,
    },
  });

  return data;
};

export const deleteUserData = async () => {
  const session = await getAuthSession();

  if (!session?.user) return false;

  const { id } = session.user;

  await db.user.delete({ where: { id } });

  redirect("/login");
};
