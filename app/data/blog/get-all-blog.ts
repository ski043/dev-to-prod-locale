import "server-only";

import { prisma } from "@/lib/db";

export async function getBlogArticles() {
  //await new Promise((resolve) => setTimeout(resolve, 15000));
  const blogArticles = await prisma.blogPost.findMany();
  return blogArticles;
}
