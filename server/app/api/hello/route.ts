import { Entry } from "@prisma/client";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const count = await prisma.entry.count();

  return NextResponse.json({ count });
};

export const POST = async (request: NextRequest) => {
  const count = await prisma.entry.count();

  return NextResponse.json({ count, foo: "Foo" });
};
