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
import { getUserData, updateProfile } from "@/app/actions";
import { useToast } from "@/components/ui/useToast";
import { PlatformData } from "./Platforms";
import { Input } from "./ui/Input";
import * as S from "./ui/Select";
import ProfileCard from "./ProfileCard";
import PreviewControls from "./PreviewControls";

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
    await updateProfile(values);
    form.reset({}, { keepValues: true });
    toast({ title: "Saved" });
  };

  if (!data) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <C.Card className="grid justify-center bg-white/50 p-8 pt-4">
        <C.CardContent>
          <div className="grid gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Preview</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Preview your profile card.
              </p>
            </div>
            <div className="grid place-content-center">
              <ProfileCard
                profileData={{ ...form.watch(), image: data?.image }}
              />
            </div>
            <PreviewControls id={data.id} />
          </div>
        </C.CardContent>
      </C.Card>

      <C.Card className="bg-white/50 py-4">
        <C.CardContent className="pb-0">
          <h2 className="text-2xl font-semibold tracking-tight">General</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Explore your general settings for customization and control.
          </p>
          <F.Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-4 flex flex-col gap-4"
            >
              <F.FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <F.FormItem className="flex-grow">
                    <F.FormLabel className="text-sm" htmlFor={field.name}>
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
                          id={field.name}
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
                    <F.FormLabel className="text-sm" htmlFor={field.name}>
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
                          id={field.name}
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
                      <F.FormControl>
                        <S.Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          name={field.name}
                        >
                          <S.SelectTrigger className="mt-2 w-full">
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
                    </F.FormLabel>
                    <F.FormMessage />
                  </F.FormItem>
                )}
              />

              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Links</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your social media profile links.
                </p>
              </div>

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
