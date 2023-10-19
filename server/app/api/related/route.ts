import prisma from "@/prisma/client";
import { Prisma, Related } from "@prisma/client";
import { isNull } from "lodash";
import { NextRequest, NextResponse } from "next/server";

interface CreatePayload {
  id: string;
  reason: Related["reason"];
}

export const POST = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const entryID = searchParams.get("entryID");

  if (isNull(entryID)) {
    return NextResponse.json({ message: "Entry ID is required" });
  }
  const { id, reason }: CreatePayload = await request.json();
  const data: Prisma.RelatedCreateInput = {
    entry: {
      connect: {
        id: entryID,
      },
    },
    connectToTerm: {
      connect: {
        id: id,
      },
    },
    reason,
  };

  const entries = await prisma.related.create({
    data,
  });

  return NextResponse.json(entries);
};
