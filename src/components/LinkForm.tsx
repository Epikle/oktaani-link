"use client";

import React from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Platform, Prisma, Visibility } from "@prisma/client";
import { Eye, EyeOff, Lock, Newspaper, UserCircle2 } from "lucide-react";

import * as F from "./ui/Form";
import { Button } from "./ui/Button";
import LinkItem from "./LinkItem";
import * as C from "@/components/ui/Card";
import Preview from "./Preview";
import { getUserData, updateProfile } from "@/app/actions";
import { useToast } from "@/components/ui/useToast";
import { PlatformData } from "./Platforms";
import { Input } from "./ui/Input";
import * as S from "./ui/Select";

export const PlatformType = z.nativeEnum(Platform);
export type Data = Prisma.PromiseReturnType<typeof getUserData>;
export type FormValues = z.infer<typeof formSchema>;
const formSchema = z.object({
  displayName: z.string(),
  description: z.string(),
  visibility: z.nativeEnum(Visibility),
  links: z
    .object({
      platform: PlatformType,
      username: z.string().min(1),
    })
    .array(),
});

const LinkForm: React.FC<{
  data: Data;
}> = ({ data }) => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: data?.displayName ?? "",
      description: data?.description ?? "",
      visibility: data?.visibility ?? "Private",
      links:
        data?.links.map((link) => ({
          platform: link.platform,
          username: link.username,
        })) ?? [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const onSubmit = async (values: FormValues) => {
    if (!data?.id) return;
    await updateProfile(data.id, values);
    form.reset({}, { keepValues: true });
    toast({ title: "Saved" });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <C.Card className="grid place-items-center p-8">
        <C.CardContent>
          <Preview control={form.control} data={data} />
        </C.CardContent>
      </C.Card>

      <C.Card className="py-4">
        <C.CardContent>
          <h3 className="text-2xl font-semibold tracking-tight">
            Customize your profile
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Add/edit/remove links below and then share your profile with the
            world!
          </p>
          <F.Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-4 flex flex-col gap-4"
            >
              <h4 className="text-xl font-semibold tracking-tight">General</h4>
              <F.FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <F.FormItem className="flex-grow">
                    <F.FormLabel className="text-sm">
                      Display Name{" "}
                      <span className="text-xs text-muted-foreground">
                        {field.value.length}/50
                      </span>
                    </F.FormLabel>
                    <F.FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Display Name"
                          className="pl-11"
                          maxLength={50}
                        />
                        <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </F.FormControl>
                    <F.FormMessage />
                  </F.FormItem>
                )}
              />

              <F.FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <F.FormItem className="flex-grow">
                    <F.FormLabel className="text-sm">
                      Description{" "}
                      <span className="text-xs text-muted-foreground">
                        {field.value.length}/100
                      </span>
                    </F.FormLabel>
                    <F.FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Description"
                          className="pl-11"
                          maxLength={100}
                        />
                        <Newspaper className="absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </F.FormControl>
                    <F.FormMessage />
                  </F.FormItem>
                )}
              />

              <F.FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <F.FormItem className="flex-grow">
                    <F.FormLabel className="text-sm">
                      Profile Visibility
                    </F.FormLabel>
                    <F.FormControl>
                      <S.Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <S.SelectTrigger className="w-full">
                          <S.SelectValue placeholder="Visibility" />
                        </S.SelectTrigger>
                        <S.SelectContent>
                          <S.SelectItem value="Private">
                            <span className="flex items-center gap-2">
                              <Lock />
                              Private
                            </span>
                          </S.SelectItem>
                          <S.SelectItem value="Unlisted">
                            <span className="flex items-center gap-2">
                              <EyeOff />
                              Unlisted
                            </span>
                          </S.SelectItem>
                          <S.SelectItem value="Public">
                            <span className="flex items-center gap-2">
                              <Eye />
                              Public
                            </span>
                          </S.SelectItem>
                        </S.SelectContent>
                      </S.Select>
                    </F.FormControl>
                    <F.FormMessage />
                  </F.FormItem>
                )}
              />

              <h4 className="text-xl font-semibold tracking-tight">Links</h4>
              <Button
                type="button"
                className="w-full"
                onClick={() => append({ platform: "GitHub", username: "" })}
                disabled={fields.length === Object.keys(PlatformData).length}
              >
                + Add new link
              </Button>

              <ul className="grid gap-4">
                {fields.map((item, index) => (
                  <li key={item.id}>
                    <LinkItem
                      index={index}
                      onRemove={remove}
                      control={form.control}
                    />
                  </li>
                ))}
              </ul>

              <Button
                type="submit"
                className="self-end"
                disabled={
                  !fields.length ||
                  !form.formState.isValid ||
                  !form.formState.isDirty
                }
              >
                Save
              </Button>
            </form>
          </F.Form>
        </C.CardContent>
      </C.Card>
    </div>
  );
};

export default LinkForm;
