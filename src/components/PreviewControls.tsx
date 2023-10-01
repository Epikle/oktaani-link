import { FC } from "react";
import Link from "next/link";
import { Copy, Eye } from "lucide-react";

import { Card, CardContent } from "./ui/Card";
import { Button, buttonVariants } from "./ui/Button";
import { useToast } from "./ui/useToast";
import { cn } from "@/lib/utils";

interface PreviewControlsProps {
  id: string;
}

const PreviewControls: FC<PreviewControlsProps> = ({ id }) => {
  const { toast } = useToast();
  const viewUrl = `view/${id}`;

  const copyHandler = async () => {
    await navigator.clipboard.writeText(window.location.href + viewUrl);
    toast({ title: "Link copied to clipboard!" });
  };

  return (
    <Card className="shadow-md">
      <CardContent className="grid gap-2 p-2 text-xs">
        <input
          readOnly
          type="text"
          defaultValue={global.window && window.location.href + viewUrl}
          onClick={(e) => e.currentTarget.select()}
          className="leading-8 outline-none"
          name="previewUrl"
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
  );
};

export default PreviewControls;
