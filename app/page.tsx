/* eslint-disable @next/next/no-img-element */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { Suspense } from "react";

import { BlogCreationForm } from "@/components/web/BlogCreationForm";
import { getBlogArticles } from "./data/blog/get-all-blog";

const ExampleOnePage = () => {
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
          <BlogCreationForm />
        </CardContent>
      </Card>
      <Suspense fallback={<div>Loading...</div>}>
        <RenderBlogArticles />
      </Suspense>
    </div>
  );
};

export default ExampleOnePage;

async function RenderBlogArticles() {
  const blogArticles = await getBlogArticles();
  return (
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
  );
}
