import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const entries = await prisma.entry.findMany();

  return NextResponse.json(entries);
};
