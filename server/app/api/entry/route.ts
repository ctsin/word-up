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

interface EntryRequest {
  entryID: Entry["id"];
}

export const DELETE = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const entryID = searchParams.get("entryID") ?? undefined;
  console.log("🚀 ~ DELETE ~ entryID:", entryID);

  const deleted = await prisma.entry.delete({
    where: { id: entryID },
  });

  return NextResponse.json(deleted);
};
