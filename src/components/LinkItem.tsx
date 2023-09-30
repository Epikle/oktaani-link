import React from "react";
import { Control, UseFieldArrayRemove } from "react-hook-form";
import { UserCircle2 } from "lucide-react";

import * as F from "./ui/Form";
import { Input } from "./ui/Input";
import * as C from "./ui/Card";
import * as S from "./ui/Select";
import { Button } from "./ui/Button";
import { FormValues } from "./LinkForm";
import { PlatformData } from "./Platforms";

interface LinkItemProps {
  control: Control<FormValues>;
  index: number;
  onRemove: UseFieldArrayRemove;
}

const LinkItem: React.FC<LinkItemProps> = ({ index, onRemove, control }) => {
  return (
    <C.Card>
      <C.CardHeader>
        <C.CardDescription className="flex items-center justify-between">
          <span>Link #{index + 1}</span>
          <Button variant="link" onClick={() => onRemove(index)}>
            Remove
          </Button>
        </C.CardDescription>
      </C.CardHeader>

      <C.CardContent className="-mt-6 flex gap-2">
        <F.FormField
          control={control}
          name={`links.${index}.platform`}
          render={({ field }) => (
            <F.FormItem className="flex-grow">
              <F.FormLabel className="text-sm">
                Platform
                <F.FormControl>
                  <S.Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name={field.name}
                  >
                    <S.SelectTrigger className="mt-2 w-full">
                      <S.SelectValue placeholder="Platform" />
                    </S.SelectTrigger>
                    <S.SelectContent>
                      {Object.entries(PlatformData).map(
                        ([itemtype, values]) => (
                          <S.SelectItem key={itemtype} value={itemtype}>
                            <span className="flex items-center gap-2">
                              {values.icon}
                              {itemtype}
                            </span>
                          </S.SelectItem>
                        ),
                      )}
                    </S.SelectContent>
                  </S.Select>
                </F.FormControl>
              </F.FormLabel>
              <F.FormMessage />
            </F.FormItem>
          )}
        />

        <F.FormField
          control={control}
          name={`links.${index}.username`}
          render={({ field }) => (
            <F.FormItem className="flex-grow">
              <F.FormLabel className="text-sm" htmlFor={field.name}>
                Username{" "}
                <span className="text-xs text-muted-foreground">
                  {field.value.length}/50
                </span>
              </F.FormLabel>
              <F.FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Username"
                    className="pl-11"
                    id={field.name}
                    maxLength={50}
                  />
                  <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </F.FormControl>
              <F.FormMessage />
            </F.FormItem>
          )}
        />
      </C.CardContent>
    </C.Card>
  );
};

export default LinkItem;
