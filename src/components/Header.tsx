import { FC } from "react";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

const Header: FC = ({}) => {
  return (
    <header className="flex items-center justify-between border-b-2 bg-gray-100 px-4 py-2">
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
        <ul>
          <Link href="/view" className="hover:underline">
            <li>Explore Profiles</li>
          </Link>
        </ul>
      </div>
      <nav>
        {/* {session && (
      <TestLogout
        name={session.user.name}
        imgUrl={session.user.image}
        email={session.user.email}
      />
    )} */}
      </nav>
    </header>
  );
};

export default Header;
