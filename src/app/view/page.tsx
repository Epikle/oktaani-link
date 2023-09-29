import { PlatformData } from "@/components/Platforms";
import { buttonVariants } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

const Page: FC = async () => {
  const profiles = await db.user.findMany({
    where: {
      visibility: "Public",
    },
    include: {
      links: true,
    },
  });

  if (!profiles || profiles.length === 0) return <p>Not Found!</p>;

  return (
    <ul className="container mt-8 grid gap-2">
      {profiles.map((profile) => (
        <li key={profile.id}>
          <Link href={`/view/${profile.id}`}>
            {profile.displayName ?? "displayName"}
          </Link>{" "}
          | {profile.description ?? "description"}
          <ul className="grid gap-2">
            {profile.links.map((link, index) => (
              <li key={index}>
                {link.platform && (
                  <Link
                    href={PlatformData[link.platform].url + link.username}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "flex items-center justify-start gap-2 ",
                      PlatformData[link.platform].color,
                    )}
                  >
                    {PlatformData[link.platform].icon} {link.username}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Page;
