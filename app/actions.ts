"use server";

import { prisma } from "@/lib/db";
import { BlogCreationSchemaType } from "@/lib/zodSchemas";

export async function getBlogArticles() {
  await new Promise((resolve) => setTimeout(resolve, 15000));
  const blogArticles = await prisma.blogPost.findMany();
  return blogArticles;
}

export async function createBlogArticle(data: BlogCreationSchemaType) {
  const blogArticle = await prisma.blogPost.create({
    data,
  });

  return blogArticle;
}
