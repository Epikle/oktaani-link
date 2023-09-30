import { FC } from "react";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

import ProfileLogout from "./ProfileLogout";
import { getAuthSession } from "@/lib/auth";
import { getUserData } from "@/app/actions";
import { Data } from "./LinkForm";

const Header: FC = async ({}) => {
  const session = await getAuthSession();
  let user: Data = null;

  if (session) {
    try {
      user = await getUserData(session.user.id);
    } catch (error) {
      return <p>Error</p>;
    }
  }

  if (!user) return null;

  return (
    <header className="flex items-center justify-between border-b-2 bg-white/50 px-4 py-2">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-sm px-4 py-2 transition-colors hover:bg-gray-400"
        >
          <LinkIcon />
          <span>
            oktaani<span className="font-extrabold">LINK</span>
          </span>
        </Link>
        <nav>
          <ul>
            <Link href="/view" className="hover:underline">
              <li>Explore Profiles</li>
            </Link>
          </ul>
        </nav>
      </div>

      <ProfileLogout user={user} />
    </header>
  );
};

export default Header;
