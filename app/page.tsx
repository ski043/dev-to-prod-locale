/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlogCreationSchema, BlogCreationSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createBlogArticle, getBlogArticles } from "./actions";

type BlogArticle = {
  title: string;
  content: string;
  imageUrl: string;
  id: string;
};

const ExampleOnePage = () => {
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([]);
  const [pending, setPending] = useState(false);

  const fetchBlogArticles = async () => {
    const blogArticles = await getBlogArticles();
    setBlogArticles(blogArticles);
  };

  useEffect(() => {
    fetchBlogArticles();
  }, []);

  const form = useForm<BlogCreationSchemaType>({
    resolver: zodResolver(BlogCreationSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: BlogCreationSchemaType) {
    setPending(true);
    await createBlogArticle(values);
    form.reset();
    setPending(false);
    await fetchBlogArticles();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">This is example 1</h1>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Create your own Blog article</CardTitle>
          <CardDescription>
            This is a form that will create a blog article.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      <Input
                        placeholder="Paste your image url here"
                        {...field}
                      />
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
        </CardContent>
      </Card>
      <div className="mt-8 flex flex-col gap-4">
        {blogArticles.map((blogArticle) => (
          <Card key={blogArticle.id}>
            <img
              className="w-full h-64 object-cover rounded-t-md"
              src={blogArticle.imageUrl}
              alt={blogArticle.title}
            />
            <CardHeader>{blogArticle.title}</CardHeader>
            <CardContent>{blogArticle.content}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExampleOnePage;
