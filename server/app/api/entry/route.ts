import { Prisma } from "@prisma/client";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { isEmpty, isNull } from "lodash";

const withEmptyRelated = ({ related, ...rest }: Prisma.EntryCreateInput) => ({
  ...rest,
  ...(isEmpty(related) ? { related: undefined } : { related }),
});

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const entryID = searchParams.get("entryID");
  if (isNull(entryID)) {
    return NextResponse.json({ message: "entryID is required" });
  }

  const entry = await prisma.entry.findUnique({
    where: {
      id: entryID,
    },
  });
  return NextResponse.json(entry);
};

export const POST = async (request: NextRequest) => {
  const data: Prisma.EntryCreateInput = await request.json();

  const filteredData = withEmptyRelated(data);
  const created = await prisma.entry.create({
    data: filteredData,
  });

  return NextResponse.json(created);
};

export const PATCH = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const entryID = searchParams.get("entryID");

  if (isNull(entryID)) {
    return NextResponse.json({ message: "entryID is required" });
  }

  const updated = await prisma.entry.update({
    where: { id: entryID },
    data: {
      related: {
        connect: {
          id: "",
        },
      },
    },
  });

  return NextResponse.json(updated);
};

export const DELETE = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const entryID = searchParams.get("entryID");

  if (isNull(entryID)) {
    return NextResponse.json({ message: "entryID is required" });
  }

  const deleted = await prisma.entry.delete({
    where: { id: entryID },
  });

  return NextResponse.json(deleted);
};
