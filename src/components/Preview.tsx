"use client";

import { FC } from "react";
import Link from "next/link";
import { Control, useWatch } from "react-hook-form";

import { Data, FormValues } from "./LinkForm";
import { Button, buttonVariants } from "./ui/Button";
import { PlatformData } from "./Platforms";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Card, CardContent } from "./ui/Card";
import { Copy, Eye } from "lucide-react";
import { useToast } from "./ui/useToast";

interface PreviewProps {
  control: Control<FormValues>;
  data: Data;
}

const Preview: FC<PreviewProps> = ({ control, data }) => {
  const { toast } = useToast();
  const watch = useWatch({
    control,
  });

  if (!watch.links || !data) return null;

  const viewUrl = `view/${data.id}`;

  const copyHandler = async () => {
    await navigator.clipboard.writeText(window.location.href + viewUrl);
    toast({ title: "Link copied to clipboard!" });
  };

  return (
    <div className="grid w-[250px] gap-4">
      <Card className="relative isolate overflow-hidden">
        <CardContent className="flex h-full flex-col gap-2 pt-6">
          <div className="flex flex-grow flex-col items-center">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-700 via-gray-700 via-15% to-15%" />
            <Avatar className="mx-auto -mt-2 h-24 w-24 border-4 border-white">
              <AvatarImage
                src={data.image ?? undefined}
                alt={watch.displayName}
              />
              <AvatarFallback>
                {(watch.displayName || "Anonymous").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h4 className="mt-2 text-center text-xl font-semibold tracking-tight">
              {watch.displayName?.trim() || "Anonymous"}
            </h4>
            <p className="mb-8 mt-2 text-center text-sm text-muted-foreground">
              {watch.description?.trim() || "No description."}
            </p>
          </div>
          <h5 className="font-semibold tracking-tight">Links</h5>
          <ul className="flex w-full flex-col gap-2">
            {watch.links.map((link, index) => (
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
        </CardContent>
      </Card>
      <Card>
        <CardContent className="grid gap-2 p-2 text-xs">
          <input
            readOnly
            type="text"
            defaultValue={global.window && window.location.href + viewUrl}
            onClick={(e) => e.currentTarget.select()}
            className="leading-8 outline-none"
          />
          <div className="grid grid-cols-2 gap-2 ">
            <Button
              variant={"destructive"}
              onClick={copyHandler}
              className="flex gap-2 text-xs"
            >
              <Copy size={20} />
              Copy
            </Button>
            <Link
              href={viewUrl}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex gap-2 text-xs",
              )}
            >
              <Eye size={20} />
              View
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Preview;
