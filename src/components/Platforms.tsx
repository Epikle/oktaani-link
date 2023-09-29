import { Github, Youtube, Instagram } from "lucide-react";
import { Platform } from "@prisma/client";

export const PlatformData: Record<
  Platform,
  { icon: React.ReactNode; url: string; color: string }
> = {
  GitHub: {
    icon: <Github />,
    url: "https://github.com/",
    color: "bg-[#6e5494]",
  },
  YouTube: {
    icon: <Youtube />,
    url: "https://youtube.com/",
    color: "bg-[#FF0000]",
  },
  Instagram: {
    icon: <Instagram />,
    url:'https://www.instagram.com/',
    color: "bg-[#5B51D8]"
  }
};
