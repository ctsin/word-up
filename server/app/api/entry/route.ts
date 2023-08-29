import { Entry } from "@prisma/client";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data: Entry = await request.json();

  const created = await prisma.entry.create({
    data,
  });

  return NextResponse.json(created);
};
