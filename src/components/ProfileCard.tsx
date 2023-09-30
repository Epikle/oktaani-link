import { FC } from "react";
import Link from "next/link";

import { Card, CardContent } from "./ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { PlatformData } from "./Platforms";
import { buttonVariants } from "./ui/Button";
import { FormValues } from "./LinkForm";
import { cn } from "@/lib/utils";

type Nullable<T> = { [K in keyof T]: T[K] | null };

interface ProfileCardProps {
  profileData: Partial<Nullable<FormValues & { image: string }>>;
}

const ProfileCard: FC<ProfileCardProps> = ({ profileData }) => {
  return (
    <Card className="relative isolate w-[250px] overflow-hidden shadow-md">
      <CardContent className="flex h-full flex-col gap-2 pt-6">
        <div className="flex flex-grow flex-col items-center">
          <div className="absolute inset-0 -z-10 h-[50px] bg-gray-200" />
          <Avatar className="mx-auto -mt-2 h-24 w-24 border-4 border-white">
            <AvatarImage
              src={profileData.image || undefined}
              alt={profileData.displayName || "Anonymous"}
            />
            <AvatarFallback>
              {(profileData.displayName || "Anonymous")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h4 className="mt-2 w-full break-words text-center text-xl font-semibold tracking-tight">
            {profileData.displayName?.trim() || "Anonymous"}
          </h4>
          <p className="mb-8 mt-2 w-full break-words text-center text-sm text-muted-foreground">
            {profileData.description?.trim() || "No description."}
          </p>
        </div>
        {profileData.links && profileData.links.length > 0 && (
          <>
            <h5 className="font-semibold tracking-tight">Links</h5>
            <ul className="flex w-full flex-col gap-2">
              {profileData.links.map((link, index) => (
                <li key={index}>
                  {link.platform && (
                    <Link
                      href={PlatformData[link.platform].url + link.username}
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "flex items-center justify-start gap-2",
                        PlatformData[link.platform].color,
                      )}
                    >
                      <span className="shrink-0">
                        {PlatformData[link.platform].icon}
                      </span>
                      <span className="overflow-hidden truncate">
                        {link.username}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
