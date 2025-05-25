"use server";

import arcjet, { fixedWindow, shield } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";
import { BlogCreationSchema, BlogCreationSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const aj = arcjet.withRule(
  shield({
    mode: "LIVE",
  })
);

function getClient(session: boolean) {
  if (session) {
    return aj.withRule(
      fixedWindow({
        mode: "LIVE",
        max: 10,
        window: "60s",
      })
    );
  } else {
    return aj.withRule(
      fixedWindow({
        mode: "LIVE",
        max: 2,
        window: "60s",
      })
    );
  }
}

type ReturnType = {
  success: boolean;
  message: string;
};

export async function createBlogArticle(
  data: BlogCreationSchemaType
): Promise<ReturnType> {
  try {
    const result = BlogCreationSchema.safeParse(data);

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const req = await request();

    const decision = await getClient(!!user).protect(req);

    if (decision.isDenied()) {
      return {
        success: false,
        message: "Too many requests",
      };
    }

    if (!result.success) {
      return {
        success: false,
        message: "Invalid data",
      };
    }

    await prisma.blogPost.create({
      data,
    });

    return {
      success: true,
      message: "Blog article created successfully",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        message: "Database error",
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
