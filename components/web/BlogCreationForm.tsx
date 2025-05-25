"use client";

import { useForm } from "react-hook-form";
import { BlogCreationSchema, BlogCreationSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogArticle } from "@/app/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

export function BlogCreationForm() {
  const [pending, startTransition] = useTransition();
  const form = useForm<BlogCreationSchemaType>({
    resolver: zodResolver(BlogCreationSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: BlogCreationSchemaType) {
    startTransition(async () => {
      try {
        const result = await createBlogArticle(values);
        form.reset();

        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch {
        toast.error("Something went wrong");
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Url</FormLabel>
              <FormControl>
                <Input placeholder="Paste your image url here" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your content" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending}>
          {pending ? "Creating..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
