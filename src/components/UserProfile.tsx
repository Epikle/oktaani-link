"use client";

import { FC } from "react";
import { signOut } from "next-auth/react";
import { LogOut, Trash } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import * as D from "@/components/ui/DropdownMenu";
import { Data } from "./LinkForm";
import { deleteUserData } from "@/app/actions";

interface UserProfile {
  user: Data;
}

const UserProfile: FC<UserProfile> = ({ user }) => {
  if (!user) return null;

  return (
    <div className="w-min">
      <D.DropdownMenu>
        <D.DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.image ?? undefined} alt={user.name ?? ""} />
            <AvatarFallback>
              {(user.name || "").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </D.DropdownMenuTrigger>
        <D.DropdownMenuContent className="w-56">
          <D.DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </D.DropdownMenuLabel>
          <D.DropdownMenuSeparator />
          <D.DropdownMenuItem
            onClick={async () => await deleteUserData()}
            className="flex cursor-pointer gap-2 bg-destructive/30"
          >
            <Trash /> Delete Profile
          </D.DropdownMenuItem>
          <D.DropdownMenuSeparator />
          <D.DropdownMenuItem
            onClick={async () => await signOut()}
            className="flex cursor-pointer gap-2"
          >
            <LogOut /> Log out
          </D.DropdownMenuItem>
        </D.DropdownMenuContent>
      </D.DropdownMenu>
    </div>
  );
};

export default UserProfile;
