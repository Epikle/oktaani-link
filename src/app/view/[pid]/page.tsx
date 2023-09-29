import { PlatformData } from "@/components/Platforms";
import { buttonVariants } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

interface PageProps {
  params: { pid: string };
}

const Page: FC<PageProps> = async ({ params }) => {
  const profile = await db.user.findUnique({
    where: {
      id: params.pid,
      OR: [{ visibility: "Public" }, { visibility: "Unlisted" }],
    },
    include: {
      links: true,
    },
  });

  if (!profile) return <p>Not Found!</p>;

  return (
    <ul className="container mt-8 grid w-full gap-2">
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
  );
};

export default Page;
