import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function getPrivateData() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const data = await prisma.user.findMany();
  return data;
}
