"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const GetWorkflowsForUser = async () => {
  const { userId } = await auth(); // Ensure auth() is correct for the library version

  if (!userId) {
    throw new Error("unauthenticated");
  }

  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};
